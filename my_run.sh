source $HOME/.nvm/nvm.sh
sudo systemctl start docker
unset npm_config_prefix
nvm install
./bin/setup-local-env.sh
