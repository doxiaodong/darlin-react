## jenkins
* /var/jenkins_home 文件夹权限

## mysql
* docker run -it --link my-mysql:mysql --rm mysql sh -c 'exec mysql -h"$MYSQL_PORT_3306_TCP_ADDR" -P"$MYSQL_PORT_3306_TCP_PORT" -uroot -p"$MYSQL_ENV_MYSQL_ROOT_PASSWORD"'

* docker exec MY-mysql sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" api' > dump.sql

* cat dump.sql | docker exec -i my-mysql /usr/bin/mysql -u root --password= DATABASE 
