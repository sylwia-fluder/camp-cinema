const {Ticket, validate} = require('../models/Ticket'); 
const {Screening} = require('../models/Screening'); 
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();

