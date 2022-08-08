import {prefix} from '../../config';
import GetAuthorDisplayName from '../../helpers/GetAuthorDisplayName';
import RandomColor from '../../helpers/RandomColor';
import Discord from 'discord.js';

const castRandomCantrip = (message) => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase(); //The first word in the command sentence
    if (command === "cast") {
        const choice = args[0].toLowerCase();
        const color = new RandomColor();
        const displayName = new GetAuthorDisplayName();

        if(choice === "options" || choice === "option") {
            let embed = new Discord.MessageEmbed()
            .setColor(color.randomColor())
            .setTitle(`If you have some powdered rock, put the the color of the powder as the first argument. If you don't, the powder will be wasted. This will still consume your action and your powder.\nSpell attack Modifier is +5. \nSpell DC is 15.`)
            .setDescription("For example, \"!cast red\"")
            .addFields(
                {name:"1", value: "Green"},
                {name:"2", value: "Blue"},
                {name:"3", value: "Pink"},
                {name:"4", value: "Cyan"},
                {name:"5", value: "Red"},
                {name:"6", value: "Yellow"},
                {name:"7", value: "Purple"},
                {name:"8", value: "Orange"}
            )
            .setTimestamp()
            .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
            Promise.resolve(message.channel.send(embed));
            return;
        }
        //TODO: maybe try to put these back in
        // const magicSchoolOptions = ["abjuration", "illusion", "enchantment", "divination", "evocation", "transmutation", "necromancy", "conjuration"]; 
        const magicColorOptions = ["green", "blue", "pink", "cyan", "red", "yellow", "purple", "orange"];
        const genericSpellAttackModifier = 5;
        
        const abjurationSpells = [
            {
                name: "Blade Ward",
                attack: false,
                damage: "",
                description: `You extend your hand and trace a sigil of warding in the air. Until the end of your next turn, you have resistance against bludgeoning, piercing, and slashing damage dealt by weapon attacks.`,
                range: "Self",
                duration: "1 round"
            },
            {
                name: "Resistance",
                attack: false,
                damage: "",
                description: `You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one saving throw of its choice. It can roll the die before or after making the saving throw. The spell then ends.`,
                range: "Touch",
                duration: "Concentration, up to 1 minute"
            }
        ]

        const illusionSpells = [
            {
                name: "Minor Illusion",
                attack: false,
                damage: "",
                description: `You create a sound or an image of an object within range that lasts for the duration. The illusion also ends if you dismiss it as an action or cast this spell again.

                    If you create a sound, its volume can range from a whisper to a scream. It can be your voice, someone else's voice, a lion's roar, a beating of drums, or any other sound you choose. The sound continues unabated throughout the duration, or you can make discrete sounds at different times before the spell ends.
                
                    If you create an image of an object—such as a chair, muddy footprints, or a small chest—it must be no larger than a 5-foot cube. The image can't create sound, light, smell, or any other sensory effect. Physical interaction with the image reveals it to be an illusion, because things can pass through it.`,
                range: "30 feet",
                duration: "1 minute"
            }
        ]

        const enchantmentSpells = [
            {
                name: "Vicious Mockery",
                attack: true,
                damage: Math.floor((Math.random() * 4)+1),
                description: `You unleash a string of insults laced with subtle enchantments at a creature you can see within range. If the target can hear you (though it need not understand you), it must succeed on a Wisdom saving throw or take 1d4 psychic damage and have disadvantage on the next attack roll it makes before the end of its next turn.

                    This spell's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).`,
                range: "60 feet",
                duration: "Instantaneous"
            },
            {
                name: "Encode Thoughts",
                attack: false,
                damage: "",
                description: `Putting a finger to your head, you pull a memory, an idea, or a message from your mind and transform it into a tangible string of glowing energy called a thought strand, which persists for the duration or until you cast this spell again. The thought strand appears in an unoccupied space within 5 feet of you as a Tiny, weightless, semisolid object that can be held and carried like a ribbon. It is otherwise stationary.

                    If you cast this spell while concentrating on a spell or an ability that allows you to read or manipulate the thoughts of others (such as detect thoughts or modify memory), you can transform the thoughts or memories you read, rather than your own, into a thought strand.
                
                    Casting this spell while holding a thought strand allows you to instantly receive whatever memory, idea, or message the thought strand contains. (Casting detect thoughts on the strand has the same effect.)`,
                range: "Self",
                duration: "8 hours"
            },
            {
                name: "Friends",
                attack: false,
                damage: "",
                description: `Putting a finger to your head, you pull a memory, an idea, or a message from your mind and transform it into a tangible string of glowing energy called a thought strand, which persists for the duration or until you cast this spell again. The thought strand appears in an unoccupied space within 5 feet of you as a Tiny, weightless, semisolid object that can be held and carried like a ribbon. It is otherwise stationary.

                    If you cast this spell while concentrating on a spell or an ability that allows you to read or manipulate the thoughts of others (such as detect thoughts or modify memory), you can transform the thoughts or memories you read, rather than your own, into a thought strand.
                
                    Casting this spell while holding a thought strand allows you to instantly receive whatever memory, idea, or message the thought strand contains. (Casting detect thoughts on the strand has the same effect.)`,
                range: "Self",
                duration: "Concentration, up to 1 minute"
            },
            {
                name: "Mind Sliver",
                attack: false,
                damage: "",
                description: `You drive a disorienting spike of psychic energy into the mind of one creature you can see within range. The target must succeed on an Intelligence saving throw or take 1d6 psychic damage and subtract 1d4 from the next saving throw it makes before the end of your next turn.

                    This spell's damage increases by 1d6 when you reach certain levels: 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "60 feet",
                duration: "1 round"
            }
        ]

        const divinationSpells = [
            {
                name: "Guidance",
                attack: false,
                damage: "",
                description: `You touch one willing creature. Once before the spell ends, the target can roll a d4 and add the number rolled to one ability check of its choice. It can roll the die before or after making the ability check. The spell then ends.`,
                range: "Touch",
                duration: "Concentration, up to 1 minute"
            },
            {
                name: "True Strike",
                attack: false,
                damage: "",
                description: `You extend your hand and point a finger at a target in range. Your magic grants you a brief insight into the target's defenses. On your next turn, you gain advantage on your first attack roll against the target, provided that this spell hasn't ended.`,
                range: "30 feet",
                duration: "Concentration, up to 1 minute"
            }
        ]

        const evocationSpells = [
            {
                name: "Word of Radiance",
                attack: false,
                damage: Math.floor((Math.random() * 6)+1),
                description: `You utter a divine word, and burning radiance erupts from you. Each creature of your choice that you can see within range must succeed on a Constitution saving throw or take 1d6 radiant damage.

                    The spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "5 feet",
                duration: "Instantaneous"
            },
            {
                name: "Thunderclap",
                attack: false,
                damage: Math.floor((Math.random() * 6)+1),
                description: `You create a burst of thunderous sound that can be heard up to 100 feet away. Each creature within range, other than you, must make a Constitution saving throw or take 1d6 thunder damage.

                    The spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "5 feet",
                duration: "Instantaneous"
            },
            {
                name: "Shocking Grasp",
                attack: true,
                damage: Math.floor((Math.random() * 8)+1),
                description: `Lightning springs from your hand to deliver a shock to a creature you try to touch. Make a melee spell attack against the target. You have advantage on the attack roll if the target is wearing armor made of metal. On a hit, the target takes 1d8 lightning damage, and it can't take reactions until the start of its next turn.

                    The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
                range: "Touch",
                duration: "Instantaneous"
            },
            {
                name: "Sacred Flame",
                attack: true,
                damage: Math.floor((Math.random() * 8)+1),
                description: `Flame-like radiance descends on a creature that you can see within range. The target must succeed on a Dexterity saving throw or take 1d8 radiant damage. The target gains no benefit from cover for this saving throw.
                
                    The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
                range: "60 feet",
                duration: "Instantaneous"
            },
            {
                name: "Booming Blade",
                attack: true,
                damage: Math.floor((Math.random() * 8)+1),
                description: `You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack's normal effects and then becomes sheathed in booming energy until the start of your next turn. If the target willingly moves 5 feet or more before then, the target takes 1d8 thunder damage, and the spell ends. This spell's damage increases when you reach certain levels. At 5th level, the melee attack deals an extra 1d8 thunder damage to the target on a hit, and the damage the target takes for moving increases to 2d8. Both damage rolls increase by 1d8 at 11th level (2d8 and 3d8) and again at 17th level (3d8 and 4d8).`,
                range: "Self (5-foot radius)",
                duration: "1 round"
            },
            {
                name: "Dancing Lights",
                attack: false,
                damage: "",
                description: `You create up to four torch-sized lights within range, making them appear as torches, lanterns, or glowing orbs that hover in the air for the duration. You can also combine the four lights into one glowing vaguely humanoid form of Medium size. Whichever form you choose, each light sheds dim light in a 10-foot radius.
                
                    As a bonus action on your turn, you can move the lights up to 60 feet to a new spot within range. A light must be within 20 feet of another light created by this spell, and a light winks out if it exceeds the spell's range.`,
                range: "120 feet",
                duration: "Concentration, up to 1 minute"
            },
            {
                name: "Eldritch Blast",
                attack: true,
                damage: Math.floor((Math.random() * 10)+1),
                description: `A beam of crackling energy streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 force damage.

                    The spell creates more than one beam when you reach higher levels: two beams at 5th level, three beams at 11th level, and four beams at 17th level. You can direct the beams at the same target or at different ones. Make a separate attack roll for each beam.`,
                range: "120 feet",
                duration: "Instantaneous"
            },
            {
                name: "Fire Bolt",
                attack: true,
                damage: Math.floor((Math.random() * 10)+1),
                description: `You hurl a mote of fire at a creature or object within range. Make a ranged spell attack against the target. On a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.

                    This spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).`,
                range: "120 feet",
                duration: "Instantaneous"
            },
            {
                name: "Frostbite",
                attack: true,
                damage: Math.floor((Math.random() * 6)+1),
                description: `You cause numbing frost to form on one creature that you can see within range. The target must make a Constitution saving throw. On a failed save, the target takes 1d6 cold damage, and it has disadvantage on the next weapon attack roll it makes before the end of its next turn.

                    The spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "60 feet",
                duration: "Instantaneous"
            },
            {
                name: "Green-Flame Blade",
                attack: true,
                damage: Math.floor((Math.random() * 8)+1),
                description: `You brandish the weapon used in the spell's casting and make a melee attack with it against one creature within 5 feet of you. On a hit, the target suffers the weapon attack's normal effects, and you can cause green fire to leap from the target to a different creature of your choice that you can see within 5 feet of it. The second creature takes fire damage equal to your spellcasting ability modifier.

                    This spell's damage increases when you reach certain levels. At 5th level, the melee attack deals an extra 1d8 fire damage to the target on a hit, and the fire damage to the second creature increases to 1d8 + your spellcasting ability modifier. Both damage rolls increase by 1d8 at 11th level (2d8 and 2d8) and 17th level (3d8 and 3d8).`,
                range: "Self (5-foot radius)",
                duration: "Instantaneous"
            },
            {
                name: "Light",
                attack: false,
                damage: "",
                description: `You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.

                    If you target an object held or worn by a hostile creature, that creature must succeed on a Dexterity saving throw to avoid the spell.`,
                range: "Touch",
                duration: "1 hour"
            },
            {
                name: "Lightning Lure",
                attack: false,
                damage: Math.floor((Math.random() * 8)+1),
                description: `You create a lash of lightning energy that strikes at one creature of your choice that you can see within 15 feet of you. The target must succeed on a Strength saving throw or be pulled up to 10 feet in a straight line toward you and then take 1d8 lightning damage if it is within 5 feet of you.

                    This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
                range: "Self (15-foot radius)",
                duration: "Instantaneous"
            },
            {
                name: "Ray of Frost",
                attack: true,
                damage: Math.floor((Math.random() *8)+1),
                description: `A frigid beam of blue-white light streaks toward a creature within range. Make a ranged spell attack against the target. On a hit, it takes 1d8 cold damage, and its speed is reduced by 10 feet until the start of your next turn.
                
                    The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
                range: "60 feet",
                duration: "Instantaneous"
            }
        ]

        const transmutationSpells = [
            {
                name: "Thorn Whip",
                attack: true,
                damage: Math.floor((Math.random() * 6)+1),
                description: `You create a long, vine-like whip covered in thorns that lashes out at your command toward a creature in range. Make a melee spell attack against the target. If the attack hits, the creature takes 1d6 piercing damage, and if the creature is Large or smaller, you pull the creature up to 10 feet closer to you.

                    This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "30 feet",
                duration: "Instantaneous"
            },
            {
                name: "Thaumaturgy",
                attack: false,
                damage: "",
                description: `You manifest a minor wonder, a sign of supernatural power, within range. You create one of the following magical effects within range:

                    Your voice booms up to three times as loud as normal for 1 minute.
                    You cause flames to flicker, brighten, dim, or change color for 1 minute.
                    You cause harmless tremors in the ground for 1 minute.
                    You create an instantaneous sound that originates from a point of your choice within range, such as a rumble of thunder, the cry of a raven, or ominous whispers.
                    You instantaneously cause an unlocked door or window to fly open or slam shut.
                    You alter the appearance of your eyes for 1 minute.
            
                    If you cast this spell multiple times, you can have up to three of its 1-minute effects active at a time, and you can dismiss such an effect as an action.`,
                range: "30 feet",
                duration: "1 minute"
            },
            {
                name: "Shillelagh",
                attack: false,
                damage: "",
                description: `The wood of a club or quarterstaff you are holding is imbued with nature's power. For the duration, you can use your spellcasting ability instead of Strength for the attack and damage rolls of melee attacks using that weapon, and the weapon's damage die becomes a d8. The weapon also becomes magical, if it isn't already. The spell ends if you cast it again or if you let go of the weapon.`,
                range: "Touch",
                duration: "1 minute"
            },
            {
                name: "Shape Water",
                attack: false,
                damage: "",
                description: `You choose an area of water that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:

                    You instantaneously move or otherwise change the flow of the water as you direct, up to 5 feet in any direction. This movement doesn't have enough force to cause damage.
                    You cause the water to form into simple shapes and animate at your direction. This change lasts for 1 hour.
                    You change the water's color or opacity. The water must be changed in the same way throughout. This change lasts for 1 hour.
                    You freeze the water, provided that there are no creatures in it. The water unfreezes in 1 hour.
            
                    If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.`,
                range: "30 feet",
                duration: "Instantaneous or 1 hour (see below)"
            },
            {
                name: "Control Flames",
                attack: false,
                damage: "",
                description: `You choose nonmagical flame that you can see within range and that fits within a 5-foot cube. You affect it in one of the following ways:

                    You instantaneously expand the flame 5 feet in one direction, provided that wood or other fuel is present in the new location.
                    You instantaneously extinguish the flames within the cube.
                    You double or halve the area of bright light and dim light cast by the flame, change its color, or both. The change lasts for 1 hour.
                    You cause simple shapes—such as the vague form of a creature, an inanimate object, or a location—to appear within the flames and animate as you like. The shapes last for 1 hour.
                
                    If you cast this spell multiple times, you can have up to three non-instantaneous effects created by it active at a time, and you can dismiss such an effect as an action.`,
                range: "60 feet",
                duration: "Instantaneous or 1 hour (see below)"
            },
            {
                name: "Druid Craft",
                attack: false,
                damage: "",
                description: `Whispering to the spirits of nature, you create one of the following effects within range:

                    - You create a tiny, harmless sensory effect that predicts what the weather will be at your location for the next 24 hours. The effect might manifest as a golden orb for clear skies, a cloud for rain, falling snowflakes for snow, and so on. This effect persists for 1 round.
                    - You instantly make a flower blossom, a seed pod open, or a leaf bud bloom.
                    - You create an instantaneous, harmless sensory effect, such as falling leaves, a puff of wind, the sound of a small animal, or the faint odor of skunk. The effect must fit in a 5-foot cube.
                    - You instantly light or snuff out a candle, a torch, or a small campfire.`,
                range: "30 feet",
                duration: "Instantaneous"
            },
            {
                name: "Gust",
                attack: false,
                damage: "",
                description: `You seize the air and compel it to create one of the following effects at a point you can see within range:

                    One Medium or smaller creature that you choose must succeed on a Strength saving throw or be pushed up to 5 feet away from you.
                    You create a small blast of air capable of moving one object that is neither held nor carried and that weighs no more than 5 pounds. The object is pushed up to 10 feet away from you. It isn't pushed with enough force to cause damage.
                    You create a harmless sensory effect using air, such as causing leaves to rustle, wind to slam shutters closed, or your clothing to ripple in a breeze.`,
                range: "30 feet",
                duration: "Instantaneous"
            },
            {
                name: "Magic Stone",
                attack: false,
                damage: "",
                description: `You generate three pebbles and imbue them with magic. You or someone else can make a ranged spell attack with one of the pebbles by throwing it or hurling it with a sling. If thrown, a pebble has a range of 60 feet. If someone attacks with a pebble, that attacker adds +5, to the attack roll. On a hit, the target takes bludgeoning damage equal to 1d6 + 5. Whether the attack hits or misses, the spell then ends on the stone.`,
                range: "Touch",
                duration: "1 minute"
            },
            {
                name: "Mending",
                attack: false,
                damage: "",
                description: `This spell repairs a single break or tear in an object you touch, such as broken chain link, two halves of a broken key, a torn cloak, or a leaking wineskin. As long as the break or tear is no larger than 1 foot in any dimension, you mend it, leaving no trace of the former damage.

                    This spell can physically repair a magic item or construct, but the spell can't restore magic to such an object.`,
                range: "Touch",
                duration: "Instantaneous"
            },
            {
                name: "Message",
                attack: false,
                damage: "",
                description: `You point your finger toward a creature within range and whisper a message. The target (and only the target) hears the message and can reply in a whisper that only you can hear.

                    You can cast this spell through solid objects if you are familiar with the target and know it is beyond the barrier. Magical silence, 1 foot of stone, 1 inch of common metal, a thin sheet of lead, or 3 feet of wood blocks the spell. The spell doesn't have to follow a straight line and can travel freely around corners or through openings.`,
                range: "120 feet",
                duration: "1 round"
            },
            {
                name: "Mold Earth",
                attack: false,
                damage: "",
                description: `You choose a portion of dirt or stone that you can see within range and that fits within a 5-foot cube. You manipulate it in one of the following ways:

                    If you target an area of loose earth, you can instantaneously excavate it, move it along the ground, and deposit it up to 5 feet away. This movement doesn't involve enough force to cause damage.
                    You cause shapes, colors, or both to appear on the dirt or stone, spelling out words, creating images, or shaping patterns. The changes last for 1 hour.
                    If the dirt or stone you target is on the ground, you cause it to become difficult terrain. Alternatively, you can cause the ground to become normal terrain if it is already difficult terrain. This change lasts for 1 hour.
            
                    If you cast this spell multiple times, you can have no more than two of its non-instantaneous effects active at a time, and you can dismiss such an effect as an action.`,
                range: "60 feet",
                duration: "Instantaneous or 1 hour (see below)"
            },
            {
                name: "Prestidigitation",
                attack: false,
                damage: "",
                description: `This spell is a minor magical trick that novice spellcasters use for practice. You create one of the following magical effects within range:

                    You create an instantaneous, harmless sensory effect, such as a shower of sparks, a puff of wind, faint musical notes, or an odd odor.
                    You instantaneously light or snuff out a candle, a torch, or a small campfire.
                    You instantaneously clean or soil an object no larger than 1 cubic foot.
                    You chill, warm, or flavor up to 1 cubic foot of nonliving material for 1 hour.
                    You make a color, a small mark, or a symbol appear on an object or a surface for 1 hour.
                    You create a nonmagical trinket or an illusory image that can fit in your hand and that lasts until the end of your next turn.
            
                    If you cast this spell multiple times, you can have up to three of its non-instantaneous effects active at a time.`,
                range: "10 feet",
                duration: "Up to 1 hour"
            },
            {
                name: "Primal Savagery",
                attack: true,
                damage: Math.floor((Math.random() * 10)+1),
                description: `You channel primal magic to cause your teeth or fingernails to sharpen, ready to deliver a corrosive attack. Make a melee spell attack against one creature within 5 feet of you. On a hit, the target takes 1d10 acid damage. After you make the attack, your teeth or fingernails return to normal.

                    The spell's damage increases by 1d10 when you reach 5th level (2d10), 11th level (3d10), and 17th level (4d10).`,
                range: "Self",
                duration: "Instantaneous"
            }
        ]

        const necromancySpells = [
            {
                name: "Toll the Dead",
                attack: false,
                damage: `${Math.floor((Math.random() * 8)+1)} or ${Math.floor((Math.random() * 12)+1)}`,
                description: `You point at one creature you can see within range, and the sound of a dolorous bell fills the air around it for a moment. The target must succeed on a Wisdom saving throw or take 1d8 necrotic damage. If the target is missing any of its hit points, it instead takes 1d12 necrotic damage.

                    The spell's damage increases by one die when you reach 5th level (2d8 or 2d12), 11th level (3d8 or 3d12), and 17th level (4d8 or 4d12).`,
                range: "60 feet",
                duration: "Instantaneous"
            },
            {
                name: "Chill Touch",
                attack: true,
                damage: Math.floor((Math.random() * 8)+1),
                description: `You create a ghostly, skeletal hand in the space of a creature within range. Make a ranged spell attack against the creature to assail it with the chill of the grave. On a hit, the target takes 1d8 necrotic damage, and it can't regain hit points until the start of your next turn. Until then, the hand clings to the target. If you hit an undead target, it also has disadvantage on attack rolls against you until the end of your next turn. This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
                range: "120 feet",
                duration: "1 round"
            },
            {
                name: "Sapping Sting",
                attack: false,
                damage: Math.floor((Math.random() * 4)+1),
                description: `You sap the vitality of one creature you can see in range. The target must succeed on a Constitution saving throw or take 1d4 necrotic damage and fall prone.

                    This spell's damage increases by 1d4 when you reach 5th level (2d4), 11th level (3d4), and 17th level (4d4).`,
                range: "30 feet",
                duration: "Instantaneous"
            },
            {
                name: "Spare the Dying",
                attack: false,
                damage: "",
                description: `You touch a living creature that has 0 hit points. The creature becomes stable. This spell has no effect on undead or constructs.`,
                range: "Touch",
                duration: "Instantaneous"
            }
        ]

        const conjurationSpells = [
            {
                name: "Sword Burst",
                attack: false,
                damage: Math.floor((Math.random() * 6)+1),
                description: `You create a momentary circle of spectral blades that sweep around you. All other creatures within 5 feet of you must succeed on a Dexterity saving throw or take 1d6 force damage.

                    This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "Self (5-foot radius)",
                duration: "Instantaneous"
            },
            {
                name: "Acid Splash",
                attack: true,
                damage: Math.floor((Math.random() * 6)+1),
                description: `You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage. This spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "60 feet",
                duration: "Instantaneous"
            },
            {
                name: "Create Bonfire",
                attack: false,
                damage: Math.floor((Math.random() * 8)+1),
                description: `You create a bonfire on ground that you can see within range. Until the spell ends, the magic bonfire fills a 5-foot cube. Any creature in the bonfire's space when you cast the spell must succeed on a Dexterity saving throw or take 1d8 fire damage. A creature must also make the saving throw when it moves into the bonfire's space for the first time on a turn or ends its turn there.

                    The bonfire ignites flammable objects in its area that aren't being worn or carried.
                    
                    The spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
                range: "60 feet",
                duration: "Concentration, up to 1 minute"
            },
            {
                name: "Infestation",
                attack: false,
                damage: Math.floor((Math.random() * 6)+1),
                description: `You cause a cloud of mites, fleas, and other parasites to appear momentarily on one creature you can see within range. The target must succeed on a Constitution saving throw, or it takes 1d6 poison damage and moves 5 feet in a random direction if it can move and its speed is at least 5 feet. Roll a d4 for the direction: 1, north; 2, south; 3, east; or 4, west. This movement doesn't provoke opportunity attacks, and if the direction rolled is blocked, the target doesn't move.

                    The spell's damage increases by 1d6 when you reach 5th level (2d6), 11th level (3d6), and 17th level (4d6).`,
                range: "30 feet",
                duration: "Instantaneous"
            },
            {
                name: "Mage Hand",
                attack: false,
                damage: "",
                description: `A spectral, floating hand appears at a point you choose within range. The hand lasts for the duration or until you dismiss it as an action. The hand vanishes if it is ever more than 30 feet away from you or if you cast this spell again.

                You can use your action to control the hand. You can use the hand to manipulate an object, open an unlocked door or container, stow or retrieve an item from an open container, or pour the contents out of a vial. You can move the hand up to 30 feet each time you use it.
                
                The hand can't attack, activate magic items, or carry more than 10 pounds.`,
                range: "30 feet",
                duration: "1 minute"
            },
            {
                name: "Poison Spray",
                attack: false,
                damage: Math.floor((Math.random() * 12)+1),
                description: `You extend your hand toward a creature you can see within range and project a puff of noxious gas from your palm. The creature must succeed on a Constitution saving throw or take 1d12 poison damage.

                    This spell's damage increases by 1d12 when you reach 5th level (2d12), 11th level (3d12), and 17th level (4d12).`,
                range: "10 feet",
                duration: "Instantaneous"
            },
            {
                name: "Produce Flame",
                attack: true,
                damage: Math.floor((Math.random() * 8)+1),
                description: `A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The spell ends if you dismiss it as an action or if you cast it again.

                    You can also attack with the flame, although doing so ends the spell. When you cast this spell, or as an action on a later turn, you can hurl the flame at a creature within 30 feet of you. Make a ranged spell attack. On a hit, the target takes 1d8 fire damage.
                
                    This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th level (3d8), and 17th level (4d8).`,
                range: "30 feet",
                duration: "10 minutes"
            },
        ]

        let embed;
        let randomInt = 0;
        let fieldArray;
        switch(choice) {
            case magicColorOptions[0]:
                randomInt = Math.floor(Math.random() * abjurationSpells.length)
                if(abjurationSpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: abjurationSpells[randomInt].damage},
                        {name:"Range: ", value: abjurationSpells[randomInt].range},
                        {name:"Duration: ", value: abjurationSpells[randomInt].duration},
                        {name:"Description: ", value: abjurationSpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: abjurationSpells[randomInt].range},
                        {name:"Duration: ", value: abjurationSpells[randomInt].duration},
                        {name:"Description: ", value: abjurationSpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#65E51F")
                .setTitle(abjurationSpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            case magicColorOptions[1]:
                randomInt = Math.floor(Math.random() * illusionSpells.length)
                if(illusionSpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: illusionSpells[randomInt].damage},
                        {name:"Range: ", value: illusionSpells[randomInt].range},
                        {name:"Duration: ", value: illusionSpells[randomInt].duration},
                        {name:"Description: ", value: illusionSpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: illusionSpells[randomInt].range},
                        {name:"Duration: ", value: illusionSpells[randomInt].duration},
                        {name:"Description: ", value: illusionSpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#1F75E5")
                .setTitle(illusionSpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            case magicColorOptions[2]:
                randomInt = Math.floor(Math.random() * enchantmentSpells.length)
                if(enchantmentSpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: enchantmentSpells[randomInt].damage},
                        {name:"Range: ", value: enchantmentSpells[randomInt].range},
                        {name:"Duration: ", value: enchantmentSpells[randomInt].duration},
                        {name:"Description: ", value: enchantmentSpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: enchantmentSpells[randomInt].range},
                        {name:"Duration: ", value: enchantmentSpells[randomInt].duration},
                        {name:"Description: ", value: enchantmentSpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#E51F7B")
                .setTitle(enchantmentSpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            case magicColorOptions[3]:
                randomInt = Math.floor(Math.random() * divinationSpells.length)
                if(divinationSpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: divinationSpells[randomInt].damage},
                        {name:"Range: ", value: divinationSpells[randomInt].range},
                        {name:"Duration: ", value: divinationSpells[randomInt].duration},
                        {name:"Description: ", value: divinationSpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: divinationSpells[randomInt].range},
                        {name:"Duration: ", value: divinationSpells[randomInt].duration},
                        {name:"Description: ", value: divinationSpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#00FFFF")
                .setTitle(divinationSpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            case magicColorOptions[4]:
                randomInt = Math.floor(Math.random() * evocationSpells.length)
                if(evocationSpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: evocationSpells[randomInt].damage},
                        {name:"Range: ", value: evocationSpells[randomInt].range},
                        {name:"Duration: ", value: evocationSpells[randomInt].duration},
                        {name:"Description: ", value: evocationSpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: evocationSpells[randomInt].range},
                        {name:"Duration: ", value: evocationSpells[randomInt].duration},
                        {name:"Description: ", value: evocationSpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#E51F1F")
                .setTitle(evocationSpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            case magicColorOptions[5]:
                randomInt = Math.floor(Math.random() * transmutationSpells.length)
                if(transmutationSpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: transmutationSpells[randomInt].damage},
                        {name:"Range: ", value: transmutationSpells[randomInt].range},
                        {name:"Duration: ", value: transmutationSpells[randomInt].duration},
                        {name:"Description: ", value: transmutationSpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: transmutationSpells[randomInt].range},
                        {name:"Duration: ", value: transmutationSpells[randomInt].duration},
                        {name:"Description: ", value: transmutationSpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#E5E31F")
                .setTitle(transmutationSpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            case magicColorOptions[6]:
                randomInt = Math.floor(Math.random() * necromancySpells.length)
                if(necromancySpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: necromancySpells[randomInt].damage},
                        {name:"Range: ", value: necromancySpells[randomInt].range},
                        {name:"Duration: ", value: necromancySpells[randomInt].duration},
                        {name:"Description: ", value: necromancySpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: necromancySpells[randomInt].range},
                        {name:"Duration: ", value: necromancySpells[randomInt].duration},
                        {name:"Description: ", value: necromancySpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#72009A")
                .setTitle(necromancySpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            case magicColorOptions[7]:
                randomInt = Math.floor(Math.random() * conjurationSpells.length)
                if(conjurationSpells[randomInt].attack) {
                    fieldArray = [
                        {name:"Attack Roll: ", value: ((Math.floor(Math.random() * 20) + 1) + genericSpellAttackModifier)},
                        {name:"Damage: ", value: conjurationSpells[randomInt].damage},
                        {name:"Range: ", value: conjurationSpells[randomInt].range},
                        {name:"Duration: ", value: conjurationSpells[randomInt].duration},
                        {name:"Description: ", value: conjurationSpells[randomInt].description}
                    ]
                } else {
                    fieldArray = [
                        {name:"Range: ", value: conjurationSpells[randomInt].range},
                        {name:"Duration: ", value: conjurationSpells[randomInt].duration},
                        {name:"Description: ", value: conjurationSpells[randomInt].description}
                    ]
                }
                embed = new Discord.MessageEmbed()
                .setColor("#FFA500")
                .setTitle(conjurationSpells[randomInt].name)
                .addFields(fieldArray)
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
                break;
            default:
                embed = new Discord.MessageEmbed()
                .setColor(color.randomColor())
                .setTitle(`${displayName.getAuthorDisplayName(message)}, Uho...`)
                .setDescription("Something happened, you must not have used proper dust...")
                .setTimestamp()
                .setFooter(`Asked by ${displayName.getAuthorDisplayName(message)}`, message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" }))
        }

        Promise.resolve(message.channel.send(embed));
    }
}

export default castRandomCantrip;