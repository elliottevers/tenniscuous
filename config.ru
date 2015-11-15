# This file is used by Rack-based servers to start the application.

require ::File.expand_path('../config/environment', __FILE__)
# require 'faye'
# Faye::WebSocket.load_adapter 'thin'
# use Faye::RackAdapter, :mount => '/faye', :timeout => 25
run Rails.application
