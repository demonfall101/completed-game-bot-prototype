const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const fs = require("fs");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.login(auth.token);

client.on('message', function(message) {
	fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
		if (buf == undefined) {
			fs.writeFile(message.author.username+".txt", "100:0:0:0:0:0:0:0:0:0", (err) => {
				if (err) console.log(err);
				console.log("Successfully Written to File.");
			});
		}
	});
	if (message.author === client.user) return;
	
	var msg = message.content.split('');
	if (msg[0] == "/" & msg[1] == "/") {
		msg.shift();
		msg.shift();
		msg = msg.join('');
		cmd = msg.split(' ');
		//commands
		if (cmd[0] == "say") {
			message.delete();
			cmd.shift();
			msg = cmd.join(' ');
			message.channel.send(msg);
		}
		else if (cmd[0] == "shop") {
			if (cmd.length > 1) {
				if (cmd.length == 4) {
					if (cmd[1] == "buy") {
						var amt = parseInt(cmd[2]);
						if (amt < 0) amt = 0;
						if (cmd[3] == "pickaxe") {
							fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
								var inv = buf.split(':')
								var gold = parseInt(inv[0], 10);
								var itemcount = parseInt(inv[1], 10);
								if (gold+1 > 100*amt) {
									gold -= 100*amt;
									inv.shift();
									inv.unshift(gold);
									itemcount += amt;
									inv[1] = itemcount;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully bought "+amt+"x pickaxes\n - you now have "+itemcount+" pickaxes\nGold left: "+gold);
								}
								else {
									message.reply("You do not have enough gold");
								}
							});
						}
						else if (cmd[3] == "axe") {
							fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
								var inv = buf.split(':')
								var gold = parseInt(inv[0], 10);
								var itemcount = parseInt(inv[2], 10);
								if (gold+1 > 50*amt) {
									gold -= 50*amt;
									inv.shift();
									inv.unshift(gold);
									itemcount += amt;
									inv[2] = itemcount;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully bought "+amt+"x axes\n - you now have "+itemcount+" axes\nGold left: "+gold);
								}
								else {
									message.reply("You do not have enough gold");
								}
							});
						}
						else if (cmd[3] == "sword") {
							fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
								var inv = buf.split(':')
								var gold = parseInt(inv[0], 10);
								var itemcount = parseInt(inv[6], 10);
								if (gold+1 > 250*amt) {
									gold -= 250*amt;
									inv.shift();
									inv.unshift(gold);
									itemcount += amt;
									inv[6] = itemcount;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully bought "+amt+"x swords\n - you now have "+itemcount+" swords\nGold left: "+gold);
								}
								else {
									message.reply("You do not have enough gold");
								}
							});
						}
						else {
							message.channel.send("There is no item by that name");
						}
					}
					else if (cmd[1] == "sell") {
						//sellable items -> pickaxes:axes:wood:iron:diamonds:swords
						fs.readFile(message.author.username+".txt", 'utf-8', function(err, inv) {
							amt = parseInt(cmd[2]);
							if (amt < 0) amt = 0;
							inv = inv.split(':');
							gold = parseInt(inv[0], 10);
							if (cmd[3] == "pickaxe") {
								pickaxenum = parseInt(inv[1], 10);
								if (pickaxenum > amt-1) {
									pickaxenum -= 1*amt;
									gold += 75*amt
									inv[0] = gold;
									inv[1] = pickaxenum;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully sold "+amt+"x pickaxes\n - pickaxes left: "+pickaxenum+"\nnew Gold ammount: "+gold);
								}
								else {
									message.channel.send("You have no item by that name");
								}
							}
							else if (cmd[3] == "axe") {
								axenum = parseInt(inv[2], 10);
								if (axenum > amt-1) {
									axenum -= 1*amt;
									gold += 40*amt;
									inv[0] = gold;
									inv[2] = axenum;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully sold "+amt+"x axes\n - axes left: "+axenum+"\nnew Gold ammount: "+gold);
								}
								else {
									message.channel.send("You have no item by that name");
								}
							}
							else if (cmd[3] == "wood") {
								woodnum = parseInt(inv[3], 10);
								if (woodnum > amt-1) {
									woodnum -= 1*amt;
									gold += 2*amt;
									inv[0] = gold;
									inv[3] = woodnum;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully sold "+amt+"x wood\n - wood left: "+woodnum+"\nnew Gold ammount: "+gold);
								}
								else {
									message.channel.send("You have no item by that name");
								}
							}
							else if (cmd[3] == "iron") {
								ironnum = parseInt(inv[4], 10);
								if (ironnum > amt-1) {
									ironnum -= 1*amt;
									gold += 2*amt;
									inv[0] = gold;
									inv[4] = ironnum;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully sold "+amt+"x iron\n - iron left: "+ironnum+"\nnew Gold ammount: "+gold);
								}
								else {
									message.channel.send("You have no item by that name");
								}
							}
							else if (cmd[3] == "diamond") {
								dianum = parseInt(inv[5], 10);
								if (dianum > amt-1) {
									dianum -= 1*amt;
									gold += 50*amt;
									inv[0] = gold;
									inv[5] = dianum;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully sold "+amt+"x diamonds\n - diamonds left: "+dianum+"\nnew Gold ammount: "+gold);
								}
								else {
									message.channel.send("You have no item by that name");
								}
							}
							else if (cmd[3] == "sword") {
								swordnum = parseInt(inv[6], 10);
								if (swordnum > amt-1) {
									swordnum -= 1*amt;
									gold += 200*amt;
									inv[0] = gold;
									inv[6] = swordnum;
									inv = inv.join(':');
									fs.writeFile(message.author.username+".txt", inv, (err) => {});
									message.channel.send("successfully sold "+amt+"x swords\n - swords left: "+swordnum+"\nnew Gold ammount: "+gold);
								}
								else {
									message.channel.send("You have no item by that name");
								}
							}
							else {
								message.channel.send("You have no item by that name");
							}
						});
					}
				}
				else if (cmd[1] == "buy") {
					message.channel.send("unknown command\n\ntype `shop -help` for more info");
				}
				else if (cmd[1] == "sell") {
					message.channel.send("unknown command\n\ntype `shop -help` for more info");
				}
				else if (cmd[1] == "-help") {
					message.channel.send("---SHOP HELP--\n*usage\n\n - `//shop`                 opens shop\n - `//shop buy [amount] [item]`          attempts to buy that amount of that item\n - `//shop sell [amount] [item]`     attempts to sell that amount of that item from your iventory");
				}
				else {
					message.channel.send("unknown command\n\ntype `shop -help` for more info");
				}
			}
			else {
				message.channel.send("--SHOP--\n - pickaxe : 100g\n - axe : 50g\n - sword : 250g");
			}
		}
		else if (cmd[0] == "inv") {
			/*
			inventory encoding
			0:0:0:0:0:0:0:0:0:0
			gold:pickaxes:axes:wood:iron:diamonds:swords:mystical-dust:souls:crates
			*/
			fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
				var invtext = ""
				var data = buf.split(':');
				var gold = data[0];
				var picks = data[1];
				var axes = data[2];
				var wood = data[3];
				var iron = data[4];
				var diamonds = data[5];
				var swords = data[6];
				var mystic = data[7];
				var souls = data[8];
				var crates = data[9];
				if (parseInt(picks, 10) > 0)
					invtext += " - pickaxes: "+picks+"\n";
				if (parseInt(axes, 10) > 0) 
					invtext += " - axes: "+axes+"\n";
				if (parseInt(wood, 10) > 0) 
					invtext += " - wood: "+wood+"\n";
				if (parseInt(iron, 10) > 0) 
					invtext += " - iron: "+iron+"\n";
				if (parseInt(diamonds, 10) > 0) 
					invtext += " - diamonds: "+diamonds+"\n";
				if (parseInt(swords, 10) > 0) 
					invtext += " - swords: "+swords+"\n";
				if (parseInt(mystic, 10) > 0) 
					invtext += " - mystical dust: "+mystic+"\n";
				if (parseInt(souls, 10) > 0) 
					invtext += " - souls: "+souls+"\n";
				if (parseInt(crates, 10) > 0)
					invtext += " - crates: "+crates+"\n";
				if (invtext == "") invtext += "(*empty*)";
				message.channel.send("**"+message.author.username+"'s Inventory**\n"+invtext+"\n\nGold: "+gold);
			});
		}
		else if (cmd[0] == "slap") {
			if (message.mentions.members.first()) {
				if (cmd[1].startsWith("<@"+message.author.id)) {
					message.channel.send("don't slap yourself!");
				}
				else {
					message.channel.send(message.author.username+" slapped "+cmd[1]+" in the face!");
				}
			}
			else {
				message.channel.send("incorrect syntax\n*usage\n - `//slap [mention member]`");
			}
		}
		else if (cmd[0] == "mine") {
			fs.readFile(message.author.username+".txt", 'utf8', function(err, buf) {
				pickaxes = parseInt(buf.split(':')[1], 10);
				inv = buf.split(':');
				if (pickaxes > 0) {
					var rnd = Math.floor(Math.random() * (101 - 1) ) + 1;
					if (rnd < 20) {
						pickaxes = parseInt(inv[1], 10);
						pickaxes -= 1;
						inv[1] = pickaxes;
						message.reply("you broke one of your pickaxes!");
					}
					else if (rnd > 19 & rnd < 80) {
						iron = Math.floor(Math.random() * (11 - 1) ) + 1;
						gold = Math.floor(Math.random() * (21 - 1) ) + 10;
						var3 = Math.floor(Math.random() * (6 - 1) ) + 1;
						if (var3 == 5) {
							msg += "\nin a cave you found 1x crate!"
							crates = parseInt(inv[9], 10);
							crates += 1;
							inv[9] = crates;
						}
						var msg = "you found:\n - "+iron+"x iron!\n - "+gold+"x gold!"
						message.reply(msg);
						inv[4] = parseInt(inv[4], 10) + iron
						inv[0] = parseInt(inv[0], 10) + gold
					}
					else if (rnd > 79) {
						diamond = Math.floor(Math.random() * (11 - 1) ) + 1;
						iron = Math.floor(Math.random() * (21 - 10) ) + 10;
						gold = Math.floor(Math.random() * (21 - 10) ) + 10;
						var3 = Math.floor(Math.random() * (4 - 1) ) + 1;
						if (var3 == 3) {
							msg += "\nin a cave you found 1x crate!"
							crates = parseInt(inv[9], 10);
							crates += 1;
							inv[9] = crates;
						}
						var msg = "you found:\n - "+iron+"x iron!\n - "+gold+"x gold!\n - "+diamond+"x diamonds!"
						message.reply(msg);
						inv[4] = parseInt(inv[4], 10) + iron
						inv[0] = parseInt(inv[0], 10) + gold
						inv[5] = parseInt(inv[5], 10) + diamond
					}
					inv = inv.join(':');
					fs.writeFile(message.author.username+".txt", inv, (err) => {});
				}
				else {
					message.channel.send("you do not have any pickaxes to mine with");
				}
			});
		}
		else if (cmd[0] == "lumber") {
			fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
				var inv = buf.split(':');
				var axes = parseInt(inv[2], 10);
				var wood = parseInt(inv[3], 10);
				if (axes > 0) {
					var rnd = Math.floor(Math.random() * (101 - 0) ) + 0;
					if (rnd < 20) {
						message.reply("you broke one of your axes!");
						axes -= 1;
						inv[2] = axes;
						inv = inv.join(':');
						fs.writeFile(message.author.username+".txt", inv, (err) => {});
					}
					else if (rnd > 19 & rnd < 80) {
						var2 = Math.floor(Math.random() * (11 - 1) ) + 1;
						message.reply("you chopped "+var2+" wood!");
						wood += var2;
						inv[3] = wood;
						inv = inv.join(':');
						fs.writeFile(message.author.username+".txt", inv, (err) => {});
					}
					else if (rnd > 79) {
						var2 = Math.floor(Math.random() * (16 - 5) ) + 5;
						var3 = Math.floor(Math.random() * (6 - 1) ) + 1;
						var msg = "you chopped "+var2+" wood!"
						if (var3 == 5) {
							msg += "\nin a clearing you found 1x crate!"
							crates = parseInt(inv[9], 10);
							crates += 1;
							inv[9] = crates;
						}
						message.reply(msg);
						wood += var2;
						inv[3] = wood;
						inv = inv.join(':');
						fs.writeFile(message.author.username+".txt", inv, (err) => {});
					}
				}
				else {
					message.channel.send("you do not have any axes to lumber with");
				}
			});
		}
		else if (cmd[0] == "dig") {
			fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
				var inv = buf.split(':');
				var rnd = Math.floor(Math.random() * 100);
				if (rnd < 51) {
					message.reply("you found nothing but dirt");
				}
				else if (rnd > 50 & rnd < 81) {
					var rnd2 = Math.floor(Math.random() * (4 - 1) ) + 1;
					var rnd3 = Math.floor(Math.random() * (11 - 1) ) + 1;
					message.reply("you found "+rnd2+" iron!\nyou found "+rnd3+" gold!");
					inv[4] = parseInt(inv[4], 10) + rnd2;
					inv[0] = parseInt(inv[0], 10) + rnd3;
					inv = inv.join(':');
					fs.writeFile(message.author.username+".txt", inv, (err) => {});
				}
				else if (rnd > 80) {
					rnd2 = Math.floor(Math.random() * (6 - 3) ) + 3;
					rnd3 = Math.floor(Math.random() * (16 - 5) ) + 5;
					rnd4 = Math.floor(Math.random() * (4 - 1) ) + 1;
					message.reply("you found "+rnd2+" iron!\nyou found "+rnd3+" gold!\nyou found "+rnd4+" diamonds!");
					inv[4] = parseInt(inv[4], 10) + rnd2;
					inv[0] = parseInt(inv[0], 10) + rnd3;
					inv[5] = parseInt(inv[5], 10) + rnd4;
					inv = inv.join(':');
					fs.writeFile(message.author.username+".txt", inv, (err) => {});
				}
			});
		}
		else if (cmd[0] == "gamble") {
			if (cmd.length == 2) {
				try {
					fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
						var gold = parseInt(buf.split(':')[0], 10);
						var amt = parseInt(cmd[1], 10);
						if (gold > amt-1) {
							var rnd = Math.floor(Math.random() * (3 - 1) ) + 1;
							if (rnd == 2) {
								gold += amt;
								message.reply("you won!\n\n you now have "+gold+" gold!")
							}
							else if (rnd == 1) {
								gold -= amt;
								message.reply("you lost :(\n\n you now have "+gold+" gold")
							}
							inv = buf.split(':');
							inv[0] = gold;
							inv = inv.join(':');
							fs.writeFile(message.author.username+".txt", inv, (err) => {});
						}
						else {
							message.reply("you do not have enough gold to bet that much");
						}
					});
				} catch {
					message.channel.send("invalid syntax\nuse `//gamble [amount of gold]`");
				}
			}
			else {
				message.channel.send("invalid syntax\nuse `//gamble [amount of gold]`");
			}
		}
		else if (cmd[0] == "crate") {
			fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
				inv = buf.split(':')
				crates = parseInt(inv[9], 10)
				if (crates > 0) {
					wood2 = parseInt(inv[3], 10);
					iron2 = parseInt(inv[4], 10);
					gold2 = parseInt(inv[0], 10);
					diamonds2 = parseInt(inv[5], 10);
					souls2 = parseInt(inv[8], 10);
					var rnd = Math.floor(Math.random() * (21 - 10) ) + 10;
					wood = rnd;
					rnd = Math.floor(Math.random() * (21 - 10) ) + 10;
					iron = rnd;
					rnd = Math.floor(Math.random() * (21 - 10) ) + 10;
					gold = rnd;
					rnd = Math.floor(Math.random() * (21 - 10) ) + 10;
					diamonds = rnd;
					rnd = Math.floor(Math.random() * (11 - 5) ) + 5;
					souls = rnd;
					inv[9] = crates - 1;
					inv[3] = wood2 + wood;
					inv[4] = iron2 + iron;
					inv[0] = gold2 + gold;
					inv[5] = diamonds2 + diamonds;
					inv[8] = souls2 + souls;
					inv = inv.join(':');
					fs.writeFile(message.author.username+".txt", inv, (err) => {});
					message.reply("\nFrom this crate, you got -\n - "+wood+"x wood\n - "+iron+"x iron\n - "+gold+"x gold\n - "+diamonds+"x diamonds\n - "+souls+"x souls");
					message.channel.send("crates left: "+(crates-1));
				}
				else {
					message.reply("you have no crates");
				}
			});
		}
		else if (cmd[0] == "help") {
			message.channel.send("--HELP--\ncommands\n - `//slap [target member]`        - slaps person 'in the face'\n - `//shop`                        - opens up the shop\n - `//gamble [amount of gold]`     - gambles the amount, if you win, you get double the amount\n - `//dig`                         - digs for resources that you can sell\n - `//lumber`                      - chops wood [requires axe]\n - `//mine`                        - goes mining [requires pickaxe]\n - `//crate`                       - opens crate [requires crate]\n - `//inv`                         - opens your inventory\n - `//fight`                        - goes out and hunts enemies\n - `//fight [member]`                        - fights that person\n\nother help\n - `//shop -help`                 - opens up the store help")
		}
		else if (cmd[0] == "fight") {
			if (cmd.length == 2 & cmd[0] == "fight") {
				if (message.mentions.members.first()) {
					fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
						inv = buf.split(':');
						if (parseInt(inv[6], 10) > 0) {
							if (cmd[1].startsWith("<@"+message.author.id)) {
								message.channel.send("don't fight yourself!");
							}
							else {
								message.reply("you are fighting "+cmd[1]);
								rnd = Math.floor(Math.random() * (3 - 1)) + 1;
								if (rnd == 2) {
									message.reply("you killed "+cmd[1]+"!");
								}
								else {
									message.reply("you lost!");
								}
							}
						}
						else {
							message.reply("you need a sword to attempt this!");
						}
					});
				}
				else {
					message.channel.send("invalid syntax\n*usage*\n - `//fight`\n - `//fight [member]`");
				}
			}
			else if (cmd.length == 1 & cmd[0] == "fight")
			{
				fs.readFile(message.author.username+".txt", 'utf-8', function(err, buf) {
					inv = buf.split(':');
					if (parseInt(inv[6], 10) > 0) {
						rnd = Math.floor(Math.random() * (101 - 1) ) + 1;
						if (rnd < 20) {
							message.reply("you broke one of your swords!");
							inv[6] = parseInt(inv[6], 10) - 1;
						}
						else if (rnd > 19 & rnd < 80) {
							rnd2 = Math.floor(Math.random() * (3-1) ) + 1;
							rnd3 = Math.floor(Math.random() * (20-1) ) + 1;
							message.reply("you killed "+rnd2+" enemies! you got:\n - "+rnd2+"x souls\n - "+rnd3+"x gold");
							inv[0] = parseInt(inv[0], 10) + rnd3;
							inv[8] = parseInt(inv[8], 10) + rnd2;
						}
						else if (rnd > 79 & rnd < 90) {
							rnd2 = Math.floor(Math.random() * (6-1) ) + 1;
							rnd3 = Math.floor(Math.random() * (50-10) ) + 10;
							message.reply("you killed "+rnd2+" enemies! you got:\n - "+rnd2+"x souls\n - "+rnd3+"x gold");
							inv[0] = parseInt(inv[0], 10) + rnd3;
							inv[8] = parseInt(inv[8], 10) + rnd2;
						}
						else if (rnd > 89) {
							rnd2 = Math.floor(Math.random() * (6-2) ) + 2;
							rnd3 = Math.floor(Math.random() * (70-30) ) + 30;
							message.reply("you killed "+rnd2+" enemies! you got:\n - "+rnd2+"x souls\n - "+rnd3+"x gold");
							inv[0] = parseInt(inv[0], 10) + rnd3;
							inv[8] = parseInt(inv[8], 10) + rnd2;
							var3 = Math.floor(Math.random() * (4 - 1) ) + 1;
							if (var3 == 3) {
								msg += "\nyou ranked up!"
								//continue here
							}
						}
					}
					else {
						message.reply("you have no swords!");
					}
					inv = inv.join(':');
					fs.writeFile(message.author.username+".txt", inv, (err) => {});
				});
			}
			else {
				message.channel.send("invalid syntax\n*usage*\n - `//fight`\n - `//fight [member]`");
			}
		}
		else if (cmd[0] == "$kick") {
			message.delete()
			if (cmd.length == 2) {
				if (message.mentions.members.first()) {
					if (cmd[1].startsWith("<@"+message.author.id)) {
					}
					else {
						var member= message.mentions.members.first();
						member.ban().then((member) => {}).catch(() => {});
					}
				}
				else {
					message.channel.send("incorrect syntax\n*usage\n - `//slap [mention member]`");
				}
			}
		}
		else {
			message.channel.send("unknown command");
		}
	}
});