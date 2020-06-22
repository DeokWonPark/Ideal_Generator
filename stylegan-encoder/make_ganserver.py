import base64

from PIL import Image
import threading
import select
import socket
import sys, os
sys.path.insert(0, './stylegan-encoder')
import operator
import pickle
import dnnlib.tflib as tflib
import numpy as np
import string
import random
from encoder.generator_model import Generator
import cv2


ip = '127.0.0.1'
port = 3008
size = 1024
port2 = 55555
LENGTH = 10  
string_pool = string.ascii_lowercase



class Synthesis:
    def __init__(self):
        root_dir = 'latent_representations/'
        listdir = []
        sort_listdir = []
        num = {}
        for i, f in enumerate(os.listdir(root_dir)):
            listdir.append(f)
            num[i] = int(f.split('_')[0])
        num = sorted(num.items(), key=operator.itemgetter(1))
        for i in range(len(num)):
            sort_listdir.append(listdir[num[i][0]])
        print(sort_listdir)
        self.latent_vectors = [np.load(root_dir + f) for f in sort_listdir]
        self.directions = {'smile': np.load('ffhq_dataset/latent_directions/smile.npy'),
                          'gender': np.load('ffhq_dataset/latent_directions/gender.npy'),
                          'age' : np.load('ffhq_dataset/latent_directions/age.npy')}

        self.new_latent_vector = np.zeros((18,512))
        tflib.init_tf()	
        with open('karras2019stylegan-ffhq-1024x1024.pkl', 'rb') as f:
            generator_network, discriminator_network, Gs_network = pickle.load(f)
        self.generator = Generator(Gs_network, batch_size=1, randomize_noise=True)
        
    def load_vectors(self, img_names):
        root_dir = 'latent_representations/'
        self.latent_vectors = [np.load(root_dir + f) for f in img_names]
        
    def generate_image(self):
        latent_vector = self.new_latent_vector.reshape((1, 18, 512))
        self.new_latent_vector = np.zeros((18,512))
        self.generator.set_dlatents(latent_vector)
        img_array = self.generator.generate_images()[0]
        img = cv2.cvtColor(img_array, cv2.COLOR_BGR2RGB)
        return img

	
    def move_and_show(self, direction, coeff):    
        self.new_latent_vector += coeff*self.directions[direction]   


    def interpolate(self,data):
        print(data.decode())
        ranks=data.decode().strip().split(' ')
        print(ranks[0])
        print(ranks[1])
        print(ranks[2])

        for i in range(len(ranks)):
            ranks[i] = int(ranks[i])-1

        print(type(ranks[0]))
        print(type(ranks[1]))
        print(type(ranks[2]))
        coeffs = [[0.5, 0.2, 0.15, 0.1, 0.05, 0.04, 0.03, 0.02],
                 [0.4, 0.2, 0.15, 0.12, 0.08, 0.06, 0.05, 0.04],
                 [0.4, 0.2, 0.15, 0.1, 0.05, 0.04, 0.03, 0.02]]
        
        ary = [[0,4], [4, 8], [8, 18]]
        for i in range(3):
            for j, rank in enumerate(ranks):            
                self.new_latent_vector[ary[i][0]:ary[i][1]] +=  self.latent_vectors[rank][ary[i][0]:ary[i][1]] * coeffs[i][j]


synthesis = Synthesis()

server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

server.bind((ip, port2))

server.listen()

input_list = [server]

def handler(s,ir,data):
    s.connect((ip, port))
    synthesis.interpolate(data)
    img = synthesis.generate_image()
    result = ""  
    for i in range(LENGTH) :
        result += random.choice(string_pool)
    cv2.imwrite('/home/nplab6/web/appdo/dsad/front/images/ideal/'+result+'.jpg', img)
    
    data = result+'.jpg'
    s.send(data.encode());
    ir.send(data.encode());
    s.close()

while True:
    input_ready, write_ready, except_ready = select.select(input_list, [], [])

    
    for ir in input_ready:
        if ir == server:
            client, address = server.accept()
            
            
            input_list.append(client)
        else:
            data = ir.recv(size)
            print(data)
            if data:
                s = socket.socket()
                threading._start_new_thread(handler,(s,ir,data))
            else:
                
                ir.close()
                input_list.remove(ir)
 
server.close()
