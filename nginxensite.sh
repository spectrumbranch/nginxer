#!/bin/bash

for i in $(ls /etc/nginx/sites-available)
do
	rm /etc/nginx/sites-enabled/$i
	ln -s /etc/nginx/sites-available/$i /etc/nginx/sites-enabled/$i
done	

