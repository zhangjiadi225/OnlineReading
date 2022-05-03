# -*- coding: utf-8 -*-
"""
Created on Sat Apr 30 19:58:47 2022

@author: zjd
"""
import pandas as pd
import numpy as np
from sqlalchemy import create_engine
import requests
from datetime import datetime
import time
from tqdm import tqdm
from bs4 import BeautifulSoup
head = {'authority': 'search.jd.com',
            'method': 'GET',
            'path': '/s_new.php?keyword=%E6%89%8B%E6%9C%BA&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%89%8B%E6%9C%BA&cid2=653&cid3=655&page=4&s=84&scrolling=y&log_id=1529828108.22071&tpl=3_M&show_items=7651927,7367120,7056868,7419252,6001239,5934182,4554969,3893501,7421462,6577495,26480543553,7345757,4483120,6176077,6932795,7336429,5963066,5283387,25722468892,7425622,4768461',
            'scheme': 'https',
            'referer': 'https://search.jd.com/Search?keyword=%E6%89%8B%E6%9C%BA&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%89%8B%E6%9C%BA&cid2=653&cid3=655&page=3&s=58&click=0',
            'user-agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'Cookie': 'qrsc=3; pinId=RAGa4xMoVrs; xtest=1210.cf6b6759; ipLocation=%u5E7F%u4E1C; _jrda=5; TrackID=1aUdbc9HHS2MdEzabuYEyED1iDJaLWwBAfGBfyIHJZCLWKfWaB_KHKIMX9Vj9_2wUakxuSLAO9AFtB2U0SsAD-mXIh5rIfuDiSHSNhZcsJvg; shshshfpa=17943c91-d534-104f-a035-6e1719740bb6-1525571955; shshshfpb=2f200f7c5265e4af999b95b20d90e6618559f7251020a80ea1aee61500; cn=0; 3AB9D23F7A4B3C9B=QFOFIDQSIC7TZDQ7U4RPNYNFQN7S26SFCQQGTC3YU5UZQJZUBNPEXMX7O3R7SIRBTTJ72AXC4S3IJ46ESBLTNHD37U; ipLoc-djd=19-1607-3638-3638.608841570; __jdu=930036140; user-key=31a7628c-a9b2-44b0-8147-f10a9e597d6f; areaId=19; __jdv=122270672|direct|-|none|-|1529893590075; PCSYCityID=25; mt_xid=V2_52007VwsQU1xaVVoaSClUA2YLEAdbWk5YSk9MQAA0BBZOVQ0ADwNLGlUAZwQXVQpaAlkvShhcDHsCFU5eXENaGkIZWg5nAyJQbVhiWR9BGlUNZwoWYl1dVF0%3D; __jdc=122270672; shshshfp=72ec41b59960ea9a26956307465948f6; rkv=V0700; __jda=122270672.930036140.-.1529979524.1529984840.85; __jdb=122270672.1.930036140|85.1529984840; shshshsID=f797fbad20f4e576e9c30d1c381ecbb1_1_1529984840145'
            }

novel_titles=[]
novel_describtion=[]
novel_image=[]
novel_now_time=[]
novel_messages=[]
def get_novel_title_msg(url):
    r = requests.get(url, headers=head)
    soup = BeautifulSoup(r.text, 'lxml')
    lis = soup.find_all('div', class_="item")
    for j in range(len(lis)):
        now_time=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        novel_now_time.append(now_time)
        first_novel=lis[j]
        first_cotent=first_novel.find('div',{'class':'p10'})
        description=first_cotent.find('dd').get_text().replace("\n","").strip()
        novel_describtion.append(description)
        first_img=first_cotent.find('div',class_='image')
        novel_url=first_img.find('a').get('href')
        novel_img=first_img.find('img').get('src')
        novel_image.append(novel_img)
        novel_title=first_img.find('img').get('alt')
        novel_titles.append(novel_title)
        pref_url=novel_url[:-10]
        r_con=requests.get(novel_url, headers=head)
        r_con.encoding = 'utf8'
        soup_con = BeautifulSoup(r_con.text, 'lxml')
        con_url_list=soup_con.find('div',class_='listmain').find_all('dd')[12:20]
        chapter_message=[]
        for k in range(len(con_url_list)):
            message={}
            content_first=con_url_list[k]
            content_first_url=pref_url+content_first.find('a').get('href')
            content_first_title=content_first.find('a').get_text()
            message['title']=content_first_title
            r_chapter=requests.get(content_first_url, headers=head)
            r_chapter.encoding = 'utf8'
            soup_chapter= BeautifulSoup(r_chapter.text, 'lxml')
            chapter_content=soup_chapter.find('div',class_='book reader').find('div',class_='content').find('div',class_='showtxt').get_text().replace('\r \xa0\xa0\xa0\xa0',"").replace('\n\xa0\xa0\xa0\xa0',"")[:-119]
            message['msg']=chapter_content
            chapter_message.append(message)
        novel_messages.append(chapter_message)
for i in tqdm(range(1,4)):
    print("开始爬取第{}页小说".format(i))
    url='https://www.shuquge.com/category/{}_1.html'.format(i)
    get_novel_title_msg(url)
    print("第{}页爬取完毕".format(i))
    time.sleep(9)
num=np.random.randint(0,6,len(novel_titles)).tolist()
title=pd.Series(novel_titles)
miaoshu=pd.Series(novel_describtion)
img=pd.Series(novel_image)
num=pd.Series(num)
shijian=pd.Series(novel_now_time)
msg=pd.Series(novel_messages)
book_id=pd.Series(range(1,len(novel_titles)+1))
book_url=pd.Series([np.NaN]*len(novel_titles))
df=pd.concat([book_id,book_url,title,miaoshu,img,num,shijian,msg],axis=1)
df.columns=['book_id','book_url','title','miaoshu','img','num','shijian','msg']
df.to_csv("novel_second.csv",index=False,encoding='utf_8_sig')
engine = create_engine('mysql+pymysql://root:root@localhost:3308/shucheng?charset=utf8')
df=pd.read_csv("novel_second.csv")
df.to_sql('books',con=engine,if_exists='append',index=None)
