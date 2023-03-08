import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
const TelegramBot = require('node-telegram-bot-api');
const cheerio = require('cheerio');
const axios = require('axios');
const User = require('../models/User');

const TELEGRAM_TOKEN = '6035059585:AAEbaxlEwiGIb2MmDGyBKPGcG36U8l4xLu0';

@Injectable()
export class TelegramService {
  private readonly bot: any;
  private logger = new Logger(TelegramService.name);

  constructor() {
    this.bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

    //setting command replies
    this.bot.onText(/\/start/, this.handleStart);
    this.bot.onText(/\/help/, this.handleStart);
    this.bot.onText(/\/price (.+)/, this.handlePrices);
    this.bot.onText(/\/frequency (.+)/, this.handleFrequency);
    this.bot.onText(/\/unsubscribe/, this.handleUnsubscribe);
    this.bot.onText(/\/subscribe/, this.handleSubscribe);
    this.bot.onText(/\/model (.+)/, this.handleModel);
  }

  // //sends daily notification to users
  @Cron('0 10 * * *')
  async handleCronDaily() {
    const subscribedUsers = await User.find({
      isSubscribed: true,
      frequency: 'daily',
    });
    for (const i in subscribedUsers) {
      this.getPrices(subscribedUsers[i].model, subscribedUsers[i].userId);
    }
  }

  //sends hourly notification to users
  @Cron('0 * * * *')
  async handleCronHourly() {
    const subscribedUsers = await User.find({
      isSubscribed: true,
      frequency: 'hourly',
    });
    for (const i in subscribedUsers) {
      this.getPrices(subscribedUsers[i].model, subscribedUsers[i].userId);
    }
  }

  handleStart = async (msg: any) => {
    const userId = msg.chat.id;
    const name = `${msg.chat.first_name} ${msg.chat.last_name}`;
    const username = msg.chat.username || '';
    this.bot.sendMessage(
      msg.chat.id,
      'Welcome to AST Consulting.\n\nHere are my commands.\n\n/price {model} - to get the price of iphones.\n/help - to get the list of commands.\n/frequency - to change the frequency of messages recieved (hourly/daily). Deafult is set to daily.\n/model - Set the model you want to recieve regular notifications of (iphone 11, iphone 12, iphone 13, iphone 14).\n/subscribe - to subscribe for recieving messages.\n/unsubscribe - to unsubscribe for recieving messages.',
      {
        reply_markup: {
          keyboard: [
            [
              '/price iphone 11',
              '/price iphone 12',
              '/price iphone 13',
              '/price iphone 14',
            ],
            ['/help'],
          ],
        },
      },
    );

    //adding new user to database
    const usercheck = await User.find({ userId: userId });
    if (usercheck.length > 0) return;
    const newUser = new User({ userId, name, username });
    await newUser.save();
  };

  getPrices = async (product: string, id: string) => {
    const url = 'https://www.pricebefore.com/mobiles/apple/';
    var titles: Array<String> = [];
    var prices: Array<String> = [];
    var links: Array<String> = [];

    axios(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('.link', html).map(function () {
          let title = $(this).text();
          let link = $(this).attr('href');
          title = title.replaceAll('\n', '').trim();
          if (title) {
            titles.push(title);
            links.push('https://www.pricebefore.com' + link);
          }
        });

        $('.final', html).map(function () {
          let price = $(this).text();
          price = price.replace('*', '').trim();
          prices.push(price);
        });

        let count = 0;
        for (var i in titles) {
          if (titles[i].toLowerCase().includes(product)) {
            const message = `Product: ${titles[i]}\nPrice after discount: ${prices[i]}\nLink: ${links[i]}`;
            this.bot.sendMessage(id, message);
            count++;
          }
        }
        if (count == 0) {
          this.bot.sendMessage(id, 'Product Invalid.');
          return;
        }
      })
      .catch((err) => this.logger.error(err));
  };

  handlePrices = (message: any, match: any) => {
    const id = message.chat.id;
    const product = match[1];
    if (!product) {
      this.bot.sendMessage(id, 'Please enter an iphone model.');
      return;
    }
    this.getPrices(match[1], id);
  };

  handleFrequency = async (message: any, match: any) => {
    const id = message.chat.id;
    const frequency = match[1];
    if (!frequency) {
      this.bot.sendMessage(id, 'Please enter a frequency.');
      return;
    }
    if (frequency != 'daily' && frequency != 'hourly') {
      this.bot.sendMessage(id, 'Invalid frequency mode (daily/hourly).');
      return;
    }
    let user = await User.findOneAndUpdate(
      { userId: id },
      { frequency: frequency },
    );
    this.bot.sendMessage(id, `Frequency updated to ${frequency}`);
  };

  handleUnsubscribe = async (message: any) => {
    const id = message.chat.id;
    let user = await User.findOneAndUpdate(
      { userId: id },
      { isSubscribed: false },
    );
    this.bot.sendMessage(id, 'Unsubscribed.');
  };

  handleSubscribe = async (message: any) => {
    const id = message.chat.id;
    let user = await User.findOneAndUpdate(
      { userId: id },
      { isSubscribed: true },
    );
    this.bot.sendMessage(id, 'Subscribed. Please set model & frequency.');
  };

  handleModel = async (message: any, match: any) => {
    const id = message.chat.id;
    let model = match[1];
    model = model.toLowerCase();
    if (!model) {
      this.bot.sendMessage(id, 'Please enter a model.');
      return;
    }
    if (
      model != 'iphone 14' &&
      model != 'iphone 13' &&
      model != 'iphone 12' &&
      model != 'iphone 11'
    ) {
      this.bot.sendMessage(
        id,
        'Invalid model. Please choose from iphone 14, iphone 13, iphone 12 or iphone 11.',
      );
      return;
    }
    let user = await User.findOneAndUpdate({ userId: id }, { model: model });
    this.bot.sendMessage(id, `Model updated to ${model}`);
  };
}
