const Discord = require("discord.js");
const client = new Discord.Client();
const embed = new Discord.RichEmbed();


const token = process.env.TOKEN2;
const prefix = "!";

client.login(token);

//////////////////////////////

client.on("ready", (ready)=>{
    console.log("ready");
    client.channels.get("501423450783481856").send("start");   

});




client.on("message", async (message)=>{
    //if (!message.guild) return;
 if (message.author.id != "466268562382651392" && message.author.id != "308921859179544577" && message.author.id != "299484669127294989") return;
    if (message.author.bot || !message.content.startsWith(prefix)) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    if (command === "news"){
        
       if (message.author.id != "466268562382651392" && message.author.id != "308921859179544577" && message.author.id != "299484669127294989" && message.author.id != "275388943460204544" && message.author.id != "220863642986348544") {
            message.reply("не сегодня");
            return;}
        message.delete();
        let filter = m => m.author.id === message.author.id;
        
        let title = "", des = "", color = "", img = "", auth = "", footer = "";
        auth = await awaitMess(message, "Загл");
        title = await awaitMess(message, "title");
        des = await awaitMess(message, "Текст");
        color = await awaitMess(message, "Цвет");
        img = await awaitMess(message, "изображения (url)");
        footer = await awaitMess(message, "footer");
        let output = {embed: {

        }};
        
               if (auth != "skip") output.embed.author = {
            name: auth
          }
        if (title != "skip") output.embed.title = title;
        if (des != "skip") output.embed.description = des;
        if (color != "skip") output.embed.color = color;
        else output.embed.color = 1118448;
        if (img != "skip") output.embed.image = {
            url: img
          };
        if (footer != "skip") output.embed.footer = {
            text: footer
          };


        let mes = await message.channel.send(output);

        await mes.react("✅");
        mes.react("❌");
        let filter_2 = (rect,user) =>  user.id == message.author.id; 
        mes.awaitReactions(filter_2,{time: 60000,errors:'error',max:1})
        .then(r=>{
            if (r.first().emoji.name === "✅"){
                message.channel.send("Опубликовано (НЕТ)");
                client.channels.get("560552268165021696").send(output);
            }
            else
            message.channel.send("Отмена");
        })
        .catch(console.error);

        }
    async function awaitMess(message, text){
        let msgDel = await message.channel.send(text);
        let filter = m => m.author.id === message.author.id;
        let msg = await message.channel.awaitMessages(filter, {max: 1, time: 300*1000, errors: ["time"]});
        msg = msg.first();
        msgDel.delete();
        msg.delete();
        return msg.content || " ";
    }

})



client.on('guildMemberAdd',(guildmember)=>{
    
});

client.on('messageReactionAdd', (react, user) => {
   
});

client.on('error',(error)=>{});

client.on('warn', () => {});
