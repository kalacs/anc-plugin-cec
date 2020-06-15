PWD := $$(pwd)
service_file := /etc/systemd/system/cec.service

install:
	sed s+{PATH}+${PWD}+g cec.service.template > ${service_file}
	systemctl enable cec.service
	systemctl start cec.service

uninstall:
	systemctl stop cec.service
	systemctl disable cec.service
	rm -rf ${service_file}