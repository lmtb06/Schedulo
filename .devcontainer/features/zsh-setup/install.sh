TARGETUSER=$(getent passwd 1001 | cut -d: -f1)
chmod +x script.sh
su $TARGETUSER -c "./script.sh"
