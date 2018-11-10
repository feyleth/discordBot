const Discord = require('discord.js');
const bot = new Discord.Client();

const { prefix, token } = require('./config.json');

const profs = ['Patoch', 'MHR', 'Pierre', 'Denis',
               'Annabelle', 'Luc', 'Florent', 'Didier',
               'Selma', 'Zina', 'Patricia', 'Oleg', 'Jeremy',
               'Sandrine', 'Regis', 'Anne-Gaelle', 'Miembro',
               'Regine', 'Jaen-Francois', 'Bibone', 'Frederic',
               'A-preciser', 'Fabrice'];

const channels = ['CHAUSSURE', 'e-sport', 'programmation'];

function createNewChannel(newMember, newUserChannel) {
  try {
    let name = newUserChannel.name + '-' + profs[Math.floor(Math.random() * profs.length)];

    newMember.guild.createChannel(name, 'voice').then((cc, tc, vc) => {
      cc.setParent(newUserChannel.parentID);
      newMember.setVoiceChannel(cc);
    });
  } catch (e) { }
}

process.on('SIGINT', () => {
    console.log('Good bye!');
    bot.destroy();
    process.exit();
});

bot.login(token);

bot.once('ready', () => {
    console.log('Ready!');
});

bot.on('guildMemberAdd', member => {
    member.addRoles(['499314917711675393', '366669559341645856']);
});

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
			// User Joins a voice channel
			if (channels.includes(newUserChannel.name)) {
				createNewChannel(newMember, newUserChannel);
			}
    } else if (newUserChannel === undefined) {
				// User leaves a voice channel	
      if (!channels.includes(oldUserChannel.name) && oldUserChannel.members.array.length === 0) {
        oldUserChannel.delete();				
      }
    } else if (oldUserChannel !== undefined && newUserChannel !== undefined) {
			// User moved channel
			if (oldUserChannel.members.array.length === 0 && !channels.includes(oldUserChannel.name)) {
				oldUserChannel.delete();				
      }
      
			if (channels.includes(newUserChannel.name)) {
			  createNewChannel(newMember, newUserChannel);
			}
		}
});