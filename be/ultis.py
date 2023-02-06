import sqlite3
import cv2
from matplotlib import pyplot as plt
import numpy as np
import imutils
import easyocr

def get_all(sql):
    conn = sqlite3.connect("./be/data/data.db")
    data = conn.execute(sql).fetchall()
    conn.close()

    return data

def license_number():
    img = cv2.imread("./be/images/3.jpg")
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    bfilter = cv2.bilateralFilter(gray, 11, 17, 17) #Noise reduction
    edged = cv2.Canny(bfilter, 30, 200) #Edge detection

    keypoints = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(keypoints)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]

    mask = np.zeros(gray.shape, np.uint8)

    (x,y) = np.where(mask==255)
    (x1, y1) = (np.min(x), np.min(y))
    (x2, y2) = (np.max(x), np.max(y))

    cropped_image = gray[x1:x2+1, y1:y2+1]
    reader = easyocr.Reader(['en'])
    result = reader.readtext(cropped_image)

    text = result[0][-2] + ' '+ result[1][-2]
    return text

if __name__ == "__main__":
    print(license_number())