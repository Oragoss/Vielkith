//NOT WORKING

import {prefix} from '../config';
//Try this one first
//https://www.npmjs.com/package/discord-music-player
const playMusic = async (message, client) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence
    let guildQueue = client.player.getQueue(message.guild.id);    
    
    if (command === "play") {
        let queue = client.player.createQueue(message.guild.id);
        console.log(`==================================
        ${JSON.stringify(queue)}`)
        await queue.join(message.member.voice.channel).then(connection => {
            // Yay, it worked!
            console.log("Successfully connected.");
          }).catch(e => {
            // Oh no, it errored! Let's log it to console :)
            console.error(e);
          });
        let song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    } else if(command === 'playlist') {
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.playlist(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    } else if (command === "skip") {
        guildQueue.skip();
    } else if (command === "stop") {
        guildQueue.stop();
    }
    if(command === 'removeLoop') {
        guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
    }

    if(command === 'toggleLoop') {
        guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
    }

    if(command === 'toggleQueueLoop') {
        guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
    }

    if(command === 'setVolume') {
        guildQueue.setVolume(parseInt(args[0]));
    }

    if(command === 'seek') {
        guildQueue.seek(parseInt(args[0]) * 1000);
    }

    if(command === 'clearQueue') {
        guildQueue.clearQueue();
    }

    if(command === 'shuffle') {
        guildQueue.shuffle();
    }

    if(command === 'getQueue') {
        console.log(guildQueue);
    }

    if(command === 'getVolume') {
        console.log(guildQueue.volume)
    }

    if(command === 'nowPlaying') {
        console.log(`Now playing: ${guildQueue.nowPlaying}`);
    }

    if(command === 'pause') {
        guildQueue.setPaused(true);
    }

    if(command === 'resume') {
        guildQueue.setPaused(false);
    }

    if(command === 'remove') {
        guildQueue.remove(parseInt(args[0]));
    }

    if(command === 'createProgressBar') {
        const ProgressBar = guildQueue.createProgressBar();
        
        // [======>              ][00:35/2:20]
        console.log(ProgressBar.prettier);
    }
}

export default playMusic;

//https://www.youtube.com/watch?v=LeH2R-UIx0s

//https://medium.com/free-code-camp/how-to-create-a-music-bot-using-discord-js-4436f5f3f0f8

// const playMusic = async (message) => {
//     const queue = new Map();
//     const serverQueue = queue.get(message.guild.id);

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase(); //The first word in the command sentence
    
//     if (command === "play") {
//         execute(message, serverQueue);
//     } else if (command === "skip") {
//         skip(message, serverQueue);
//     } else if (command === "stop") {
//         stop(message, serverQueue);
//     }

//     const songInfo = await ytdl.getInfo(args[1]);
//     const song = {
//         title: songInfo.title,
//         url: songInfo.video_url,
//     };

//     if (!serverQueue) {
//         const queueContruct = {
//             textChannel: message.channel,
//             voiceChannel: voiceChannel,
//             connection: null,
//             songs: [],
//             volume: 5,
//             playing: true,
//            };
//            // Setting the queue using our contract
//            queue.set(message.guild.id, queueContruct);
//            // Pushing the song to our songs array
//            queueContruct.songs.push(song);
           
//            try {
//             // Here we try to join the voicechat and save our connection into our object.
//             var connection = await voiceChannel.join();
//             queueContruct.connection = connection;
//             // Calling the play function to start a song
//             play(message.guild, queueContruct.songs[0]);
//            } catch (err) {
//             // Printing the error message if the bot fails to join the voicechat
//             console.log(err);
//             queue.delete(message.guild.id);
//             return message.channel.send(err);
//            }
//     } else {
//      serverQueue.songs.push(song);
//      console.log(serverQueue.songs);
//      return message.channel.send(`${song.title} has been added to the queue!`);
//     }

//     const dispatcher = serverQueue.connection
//     .play(ytdl(song.url))
//     .on("finish", () => {
//         serverQueue.songs.shift();
//         play(guild, serverQueue.songs[0]);
//     })
//     .on("error", error => console.error(error));
//     dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
//     serverQueue.textChannel.send(`Start playing: **${song.title}**`);
// }

// async function execute(message, serverQueue) {
//     // const args = message.content.split(" ");
  
//     const voiceChannel = message.member.voice.channel;
//     if (!voiceChannel)
//       return message.channel.send(
//         "You need to be in a voice channel to play music!"
//       );
//     const permissions = voiceChannel.permissionsFor(message.client.user);
//     if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
//       return message.channel.send(
//         "I need the permissions to join and speak in your voice channel!"
//       );
//     }
// }

// function play(guild, song) {
//     const serverQueue = queue.get(guild.id);
//     if (!song) {
//       serverQueue.voiceChannel.leave();
//       queue.delete(guild.id);
//       return;
//     }
// }