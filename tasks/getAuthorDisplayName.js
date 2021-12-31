const getAuthorDisplayName = (msg) => {
    const member = msg.guild.member(msg.author);
    return member ? member.displayName : msg.author.username;
}
export default getAuthorDisplayName;