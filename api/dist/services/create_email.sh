#!/usr/bin/expect -f

set containerName [lindex $argv 0]
set email [lindex $argv 1]
set password [lindex $argv 2]

spawn docker exec -it $containerName setup email add $email
expect "Enter Password:"
send "$password\r"
expect eof
