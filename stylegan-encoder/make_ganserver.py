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
_LENGTH = 10 # 10자리 
string_pool = string.ascii_lowercase # 소문자 


#Stylegan_Synthesis
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
                          'age' : np.load('ffhq_dataset/latent_directions/age.npy'),
                          'makeup': np.load('ffhq_dataset/latent_directions/Makeup.npy'),
                          'hair_colr_blond' : np.load('ffhq_dataset/latent_directions/hair_color_blond.npy')}
                          #'hair_colr_black' : np.load('ffhq_dataset/latent_directions/hair_color_black.npy'),
                          #'hair_colr_gray' : np.load('ffhq_dataset/latent_directions/hair_color_gray.npy'),
                          #'hair_colr_red' : np.load('ffhq_dataset/latent_directions/hair_color_red.npy')}
        self.new_latent_vector = np.zeros((18,512))
        tflib.init_tf()	
        with open('karras2019stylegan-ffhq-1024x1024.pkl', 'rb') as f:
            generator_network, discriminator_network, Gs_network = pickle.load(f)
        self.generator = Generator(Gs_network, batch_size=1, randomize_noise= True)
        
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
    
    def return_vector(self):
        return self.new_latent_vector
    
    def set_vector(self, vector):
        self.new_latent_vector = vector
	
    def move_and_show(self, direction, coeff):    
        self.new_latent_vector += coeff*self.directions[direction]   

# Figure 4: Noise detail.
    def interpolate(self,data):
        ranks=data

        for i in range(len(ranks)):
            ranks[i] = int(ranks[i])-1

        coeffs = [[0.5, 0.2, 0.15, 0.1, 0.05, 0.04, 0.03, 0.02],
                 [0.4, 0.2, 0.15, 0.12, 0.08, 0.06, 0.05, 0.04],
                 [0.4, 0.2, 0.15, 0.1, 0.05, 0.04, 0.03, 0.02]]
        
        ary = [[0,4], [4, 8], [8, 18]]
        for i in range(3):
            for j, rank in enumerate(ranks):            
                self.new_latent_vector[ary[i][0]:ary[i][1]] +=  self.latent_vectors[rank][ary[i][0]:ary[i][1]] * coeffs[i][j]


synthesis = Synthesis()
# 소켓생성
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 바인드
server.bind((ip, port2))
# 리슨, 여기까지는 기본적인 서버 소켓 세팅
server.listen()
# select 함수에서 관찰될 소켓 리스트 설정
input_list = [server]

def handler(s,ir,data):
    data = data.decode().strip().split(' ')
    s.connect((ip, port))
    result = ""
    if data[0] == 'r':
        for i in range(1, len(data)):
            data[i] = int(data[i]) 
        synthesis.interpolate(data[1: 9])
        latent_vector = synthesis.return_vector() 
        img = synthesis.generate_image()
        for i in range(_LENGTH) :
            result += random.choice(string_pool) # 랜덤한 문자열 하나 선택
        cv2.imwrite('C:/Users/tjrwj/appdo-master/appdo/front/images/ideal/'+result+'.jpg', img)
        np.save('C:/Users/tjrwj/appdo-master/appdo/front/images/ideal/'+result+'.npy', latent_vector)
        result = result + '.jpg' 
    elif data[0] == 't':    
        vector_path = 'C:/Users/tjrwj/appdo-master/appdo/front/images/ideal/' + data[1].split('/')[-1].replace('jpg', 'npy')
        print(data[1])
        vector = np.load(vector_path)
        synthesis.set_vector(vector)
        synthesis.move_and_show('age', int(data[2])/10 * -1)
        synthesis.move_and_show('makeup', int(data[3])/10)
        synthesis.move_and_show('hair_colr_blond', int(data[4])/5)
        img = synthesis.generate_image()
        img_path = vector_path.replace('npy', 'jpg')
        cv2.imwrite(img_path, img)
        result = img_path.split('/')[-1]
    
    
    #image_path = '/home/nplab6/web/appdo/창설/front/images/ideal/'+result+'.jpg'
    #if image_path != '':
    #    with open(image_path, "rb") as imageFile:
    #        #image_data = base64.b64encode(img)
    #        image_data = base64.b64encode(imageFile.read())
    #else:
    #    image_data = 'cusdom_image'
    #s.sendall(image_data)   
    data = result
    s.send(data.encode());
    ir.send(data.encode());
    s.close()

while True:
    # select 함수는 관찰될 read, write, except 리스트가 인수로 들어가며
    # 응답받은 read, write, except 리스트가 반환된다.
    # input_list 내에 있는 소켓들에 데이터가 들어오는지 감시한다.
    # 다르게 말하면 input_list 내에 읽을 준비가 된 소켓이 있는지 감시한다.
    input_ready, write_ready, except_ready = select.select(input_list, [], [])

    # 응답받은 read 리스트 처리
    for ir in input_ready:
        if ir == server:
            client, address = server.accept()
            print(address, 'is connected', flush=True)
            # input_list에 추가함으로써 데이터가 들어오는 것을 감시함
            input_list.append(client)
 
        # 클라이언트소켓에 데이터가 들어왔으면
        else:
            data = ir.recv(size)
            print(data)
            if data:
                s = socket.socket()
                threading._start_new_thread(handler,(s,ir,data))
            # 데이터가 없는경우, 즉 클라이언트에서 소켓을 close 한경우
            else:
                print(ir.getpeername(), 'close', flush=True)
                ir.close()
                # 리스트에서 제거
                input_list.remove(ir)
 
server.close()
