import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import BrandWordmark from '@/components/ui/brand-wordmark';

const pledgeActions = [
  { id: 1, text: 'DEMAND JUSTICE', active: false },
  { id: 2, text: 'SHARE THEIR STORIES', active: false },
  { id: 3, text: 'WRITE LETTERS', active: false },
  { id: 4, text: 'CONTRIBUTE TO THE COUNCIL', active: false },
  { 
    id: 5, 
    text: 'DONATE TO FREEDOM FUND', 
    active: false, 
    description: "Freedom Fund is a Georgian crowdsourcing initiative that supports pro-democracy, anti-Russian protest in the Republic of Georgia. It has paid for more than 10% of people's fines in Georgia, and now supports 32 of the regime's 120 political prisoners. This takes 16,000 GEL per month.",
    disclaimer: 'This is not a fund managed by the Civic Council of Georgia, Inc. It is unaffiliated with its board or management. Contribution to the Freedom Fund does not entitle 501c(3) tax deductions.',
    link: 'https://georgiaprotest.com/en/freedom-fund'
  },
];

// Political prisoners from georgiaprotest.com (scraped Dec 2025)
// Birthday format: MM-DD (month-day only, for annual recurrence)
// Real birthdays fetched from georgiaprotest.com/en/political-prisoners
const politicalPrisoners = [
  { name: 'Pridon Bubuteishvili', age: 20, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763643259230-1750683721_484696969.png' },
  { name: 'Davit Koldari', age: 22, birthday: '04-14', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763643083054-1750683740_736736737.png' },
  { name: 'Giorgi Kuchuashvili', age: 31, birthday: '07-16', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763643038497-1750683709_5757477.png' },
  { name: 'Irakli Meghvinetukhutsesi', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642996798-1750633864_53125123515.png' },
  { name: 'Ucha Abashidze', age: 41, birthday: '01-03', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642929954-1750636579_06770670.png' },
  { name: 'Mariam Iashvili', age: 38, birthday: '11-11', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642845967-1750676400_Untitled-1.png' },
  { name: 'Giorgi Okmelashvili', age: 42, birthday: '01-14', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642796481-1750678213_725472572457.png' },
  { name: 'Mate Devidze', age: 21, birthday: '12-06', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642766731-dsc08988.jpeg.jpg' },
  { name: 'Anatoli Gigauri', age: 45, birthday: '05-23', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642682157-1751402002_8647697699.png' },
  { name: 'Valeri Tetrashvili', age: 28, birthday: '05-05', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642625927-1750753710_84684694679.png' },
  { name: 'Temur Zasokhashvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642577667-1750754665_65477367368.png' },
  { name: 'Archil Museliantsi', age: 30, birthday: '10-17', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642524878-1750772672_Untitled-1.png' },
  { name: 'Giorgi Mindadze', age: 22, birthday: '07-06', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642479161-1750776658_7572357338.png' },
  { name: 'Davit Lomidze', age: 53, birthday: '06-26', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642396038-1750771200_68795795.png' },
  { name: 'Davit Khomeriki', age: 26, birthday: '01-01', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642335251-1750772453_512345134.png' },
  { name: 'Anton Chechin', age: 27, birthday: '09-24', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642260674-1750776560_753735737.png' },
  { name: 'Daniel Mumladze', age: 24, birthday: '09-10', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642224528-1750777476_8464979.png' },
  { name: 'Guram Khutashvili', age: 27, birthday: '03-04', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642168318-1750777972_54362346246.png' },
  { name: 'Vasil Kadzelashvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763642066662-1750782177_5357357357.png' },
  { name: 'Vepkhia Kasradze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641966127-1750941789_Untitled-1.png' },
  { name: 'Giorgi Gorgadze', age: 21, birthday: '02-12', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641903896-1750942305_74568468469.png' },
  { name: 'Tornike Goshadze', age: 26, birthday: '04-11', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641771291-1750943021_656256%20(1).png' },
  { name: 'Insaf Aliev', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641729662-1750964910_68569579579.png' },
  { name: 'Irakli Miminoshvili', age: 20, birthday: '09-16', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641680055-1750965727_563547547357.png' },
  { name: 'Saba Jikia', age: 19, birthday: '06-26', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641636897-1751055918_84946794679.png' },
  { name: 'Zviad Tsetskhladze', age: 20, birthday: '05-24', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641593996-1751056211_7547358356868%20(1).png' },
  { name: 'Andro Chichinadze', age: 29, birthday: '07-30', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641552960-1751057529_9479479.png' },
  { name: 'Guram Mirtskhulava', age: 35, birthday: '08-28', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641506271-1751060201_68368479679.png' },
  { name: 'Anri Kvaratskhelia', age: 26, birthday: '01-20', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641265323-1751060999_7357357357.png' },
  { name: 'Ruslan Sivakov', age: 28, birthday: '08-10', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763641138787-1751662440_686798670580.png' },
  { name: 'Onise Tskhadadze', age: 29, birthday: '04-30', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640907864-1751662189_863485684679.png' },
  { name: 'Nikoloz Javakhishvili', age: 21, birthday: '09-30', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640856925-1751662038_7365856868.png' },
  { name: 'Saba Skhvitaridze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640809760-1751399851_57538658.png' },
  { name: 'Sergey Kukharchuk', age: 28, birthday: '02-22', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640763006-1751661809_658356856848.png' },
  { name: 'Irakli Kerashvili', age: 30, birthday: '01-07', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640726218-1751657684_8568696479679.png' },
  { name: 'Revaz Kiknadze', age: 27, birthday: '01-07', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640684881-1751661624_37385688.png' },
  { name: 'Giorgi Terishvili', age: 54, birthday: '03-19', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640635730-1751661483_6347357.png' },
  { name: 'Luka Jabua', age: 21, birthday: '07-21', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640581090-1751657866_68658469.png' },
  { name: 'Jano Archaia', age: 50, birthday: '03-01', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763640545856-1751875425_74659479679.png' },
  { name: 'Artem Gribul', age: 25, birthday: '06-26', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763571653202-publika.ge--3-5.jpg' },
  { name: 'Anastasia Zinovkina', age: 31, birthday: '02-04', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763571330707-1751928103_736586979579.png' },
  { name: 'Mzia Amaghlobeli', age: 50, birthday: '05-12', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763571271699-mzia-amagloebli.jpg' },
  { name: 'Giorgi Chikvaidze', age: 39, birthday: '07-31', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763571154066-giorgi_chikvaidze-44785.webp' },
  { name: 'Denis Kulanin', age: 30, birthday: '01-26', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763571055083-1744743234_316001091_105337842406247_653372038457343378_n.jpg' },
  { name: 'Giorgi Neparidze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763571008227-1747638750_Artboard%201%20copy%2059.png' },
  { name: 'Irakli Papiashvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763570902952-1746822454_Artboard%201%20copy%2056.png' },
  { name: 'George Bachiashvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763570844541-Giorgi-Bachiasvhili.jpeg' },
  { name: 'Zviad Ratiani', age: 54, birthday: '01-05', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763570725890-43788491_10156192730318218_836271823778742272_n_685a40a5abf9c.jpg' },
  { name: 'Lasha Tsanava', age: 39, birthday: '02-10', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763569577375-1754377839_195975936_1792668991064060_3106008840968036143_n.jpg' },
  { name: 'Tornike Toshkhua', age: 37, birthday: '06-21', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763569540887-1755501798_532164149_30961885533427218_7783993755996057565_n.jpg' },
  { name: 'Mindia Shervashidze', age: 33, birthday: '03-05', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763569489327-1755501702_99a1b016-ea64-4a65-9e12-a405f81df240.jpeg' },
  { name: 'Gela Khasaia', age: 28, birthday: '01-06', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763568559316-publika.ge---2-2-1.jpg' },
  { name: 'Lasha Beridze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763567688855-1759745389_458231744_3924920477737020_5943568733916048957_n.jpg' },
  { name: 'Paata Burchuladze', age: 70, birthday: '02-12', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763567330764-1759744820_1636106161_paata-burtculadze-2.jpg' },
  { name: 'Sergi Megrelishvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566987053-1760264913_532617239_738295955479326_4078301421908922477_n.jpg' },
  { name: 'Kakhaber Mzhavanadze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566798687-1760218587_729befa4-b0ed-4907-8171-08ddfa9117a6_w1597_n_r0_s_s%20(1).png' },
  { name: 'Aleksandre Khabeishvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566495927-1760264184_469558805_604144715508956_7904626708476059158_n.jpg' },
  { name: 'Manuchar Mikeladze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566439802-1760218703_107797016_2570504306534376_989258745032132213_n.jpg' },
  { name: 'Davit Sturua', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566324263-1760032001_12381d0e-603f-4663-8cbf-1160840f8519.jpeg' },
  { name: 'Vakhtang Pitskhelauri', age: 33, birthday: '09-22', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566183918-1759950294_Untitled-design-2025-10-06T220634.645.jpg' },
  { name: 'Giorgi Rurua', age: 38, birthday: '08-07', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566138699-1760219003_480261524_10227988244914415_2476697156631238760_n.jpg' },
  { name: 'Eva Shashviashvili', age: 46, birthday: '12-06', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763566067649-1760046864_7ae48dc9-baa7-4bf6-9433-096edf76df29.jpeg' },
  { name: 'Aleksandre Gogoladze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763565912338-1760217020_560262219_122178971648534339_5847146340508163796_n.jpg' },
  { name: 'Davit Zghenti', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763565831341-1760265099_558481083_1572039947528883_5807280222205249540_n.jpg' },
  { name: 'Abo Naveriani', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763565128917-1760032337_5398afc6-ec39-4b11-ae83-14b8e7152dc4.jpeg' },
  { name: 'Tornike Mchedlishvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763565074091-1759946760_560629915_1571884514211093_3199040798705415494_n.jpg' },
  { name: 'Mamuka Labuchidze', age: 49, birthday: '03-27', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763565000691-1760957163_a064a7f5-00e3-4b4d-8fd9-4e7f449ec4cc.jpeg' },
  { name: 'Nana Sander', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564956570-1759949033_490151921_9673129706099912_364244984530997997_n.jpg' },
  { name: 'Koba Epitashvili', age: 59, birthday: '03-23', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564892831-1760197972_e92e545d-1b6f-4804-b13a-fe200894f4d1%20(1).jpeg' },
  { name: 'Nika Gventsadze', age: 50, birthday: '10-01', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564835745-1760198544_486464365_10229792667254205_3243406575707918275_n.jpg' },
  { name: 'Vladimer Gvelesiani', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564727761-1760455537_490483187_9851159628280928_4343601120262811232_n.jpg' },
  { name: 'Levan Jikhia', age: 55, birthday: '01-18', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564680965-1760265266_458728946_1963212237453700_5792313750664998136_n.jpg' },
  { name: 'Lasha Ivanadze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564615391-1760217817_494102814_2047445812418962_1311770320141893866_n.jpg' },
  { name: 'Genadi Kupreishvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564391096-1760217749_506283377_4213238865664721_4643736342213981482_n.png' },
  { name: 'Guriel Kardava', age: 36, birthday: '03-23', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564322576-1760197951_343788814_771017304409150_4247936525748618623_n.jpg' },
  { name: 'Sulkhan Abralava', age: 48, birthday: '09-15', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564050039-1760032431_099812e9-16dd-473a-8ff5-1dde01b1a9e9.jpeg' },
  { name: 'Beka Kelekhsashvili', age: 21, birthday: '08-25', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763564003010-1760032219_a38206b5-da58-4ce6-b347-274c157f8cbf.jpeg' },
  { name: 'Giorgi Kirvalidze', age: 38, birthday: '08-28', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563861375-1760263961_474593419_947730673982529_8363452935147471130_n.jpg' },
  { name: 'Aleksandre Chilachava', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563744844-1759949670_aleqs.png' },
  { name: 'Konstantine Kokaia', age: 64, birthday: '08-30', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563686087-1759949544_kote-kokaia.png' },
  { name: 'Zurab Chavchanidze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563624362-1759949447_medroshe-2.jpg' },
  { name: 'Saba Kordzaia', age: 25, birthday: '01-19', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563544674-1759949346_vdmo6k692kgfd3k.png' },
  { name: 'Khvicha Gogokhia', age: 52, birthday: '04-06', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563477471-1760363697_6ce9b7de-3cd6-400f-8c3c-57a67e347704.jpeg' },
  { name: 'Giorgi Muladze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563394398-1760363645_eedfa920-a584-4ab1-87dc-5df8f1de3583.png' },
  { name: 'Ramaz Mamuladze', age: 44, birthday: '03-15', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563349118-1760037272_681e4484-e8a4-4ec2-bb22-21a8de6bf73e.jpeg' },
  { name: 'Amiran Dolishvili', age: 21, birthday: '12-11', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563312361-1760047191_480476717_1711729063021958_7136973725219466110_n.jpg' },
  { name: 'Zakro Albutashvili', age: 66, birthday: '01-11', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563238214-1760363247_e39d951d-0a0c-4819-8a60-b135421ccd6b%20(1).jpeg' },
  { name: 'Avtandil Surmanidze', age: 30, birthday: '04-15', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563154420-1760262784_481034171_1170106497833573_318256886525516374_n%20(1).jpg' },
  { name: 'Irakli Chkhvirkia', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763563038340-1760263421_468963752_17964759035821163_8022967319502462268_n%20(1).jpg' },
  { name: 'Guri Zhvania', age: 59, birthday: '10-30', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763562970470-1761120637_342687be-fc91-45ed-b6c7-b5d23d702b9d.jpeg' },
  { name: 'Iuri Lomidze', age: 31, birthday: '01-30', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763562924356-1760877152_504381383_10011587745624276_2871355996142866526_n.jpg' },
  { name: 'Kakhaber Kvatchantiradze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763398475688-1760876762_axa-kvachantiradze.jpg' },
  { name: 'Gia Toloraia', age: 66, birthday: '02-14', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763398405363-1761120877_90895225-288a-4b20-a0b2-0fa428a40c32.jpeg' },
  { name: 'Temur Kurtsikidze', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763398215171-1760876461_489457382_4097062930616599_8894393209199337987_n.jpg' },
  { name: 'Giorgi Talakhadze', age: 41, birthday: '05-21', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763398150517-1760876101_566224132_1581581336574744_4395554544909485558_n.jpg' },
  { name: 'Davit Giunashvili', age: 69, birthday: '09-22', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763398050804-1760875538_567681756_10163446897214350_8710579455125541391_n.jpg' },
  { name: 'Simon Makharadze', age: 22, birthday: '02-18', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763397987163-1760875347_500238546_122157607610452293_682427801453645756_n.jpg' },
  { name: 'Tamar Lortkipanidze', age: 48, birthday: '10-19', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763397567010-4de86afe-ab93-4a92-9bf3-08ddfa911745_w408_r1_s.jpg' },
  { name: 'Zura Menteshashvili', age: null, birthday: null, image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763397345622-1762374843_22b69a04-570b-491c-93ea-9fe40a02f1ff.jpg' },
  { name: 'Davit Ghurtskaia', age: 27, birthday: '12-19', image: 'https://klygvkanttfzhyycgcmq.supabase.co/storage/v1/object/public/pictures/1763211011300-1760876241_168148234_2852905904929994_5411115774672260177_n.jpg' },
  // Prisoners without photos
  { name: 'Beka Matchavariani', age: null, birthday: null, image: null },
  { name: 'Giorgi Korkia', age: null, birthday: null, image: null },
  { name: 'Jandri Thirkia', age: 51, birthday: '07-29', image: null },
  { name: 'Ramaz Jorbenadze', age: null, birthday: null, image: null },
  { name: 'Anton Vardanidze', age: 59, birthday: '05-06', image: null },
  { name: 'Avtandil Tofchishvili', age: 48, birthday: '09-28', image: null },
  { name: 'Genadi Kekhilashvili', age: 50, birthday: '09-07', image: null },
  { name: 'Mikheil Toloraia', age: 37, birthday: '01-17', image: null },
];

// Carousel component with pause on hover
function CarouselWithPause() {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredPrisoner, setHoveredPrisoner] = useState<typeof politicalPrisoners[0] | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35 }}
      className="mb-10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredPrisoner(null);
      }}
    >
      <div className="relative">
        {/* Gradient masks for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#E8EFF7] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#E8EFF7] to-transparent z-10" />
        
        <motion.div 
          className="flex items-center gap-3"
          animate={{ x: isPaused ? undefined : [0, -((politicalPrisoners.length * 92))] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {/* Double the array for seamless loop */}
          {[...politicalPrisoners, ...politicalPrisoners].map((prisoner, idx) => (
            <div
              key={idx}
              className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 group cursor-pointer"
              style={{
                filter: hoveredPrisoner?.name === prisoner.name ? 'grayscale(0%) contrast(1)' : 'grayscale(100%) contrast(1.1)',
                transition: 'filter 0.3s ease',
              }}
              onMouseEnter={() => setHoveredPrisoner(prisoner)}
              onMouseLeave={() => setHoveredPrisoner(null)}
            >
              <ImageWithFallback
                src={prisoner.image}
                alt={prisoner.name}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110"
                style={{
                  mixBlendMode: hoveredPrisoner?.name === prisoner.name ? 'normal' : 'multiply',
                }}
              />
              {/* Overlay effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-[#4A7BA7]/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300"
                style={{
                  mixBlendMode: 'overlay',
                }}
              />
              {/* Name tooltip on hover */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-[#0B1F3F] text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 pointer-events-none">
                <div className="font-medium">{prisoner.name}</div>
                {prisoner.age && <div className="text-white/70">Age {prisoner.age}</div>}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Current hovered prisoner info */}
      <AnimatePresence>
        {hoveredPrisoner && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="mt-3 text-sm text-[#0B1F3F]"
          >
            <span className="font-medium">{hoveredPrisoner.name}</span>
            {hoveredPrisoner.age && <span className="text-[#0B1F3F]/50 ml-2">Age {hoveredPrisoner.age}</span>}
          </motion.div>
        )}
      </AnimatePresence>
      
      {!hoveredPrisoner && (
        <div className="text-xs text-[#0B1F3F]/40 mt-3">
          Total: {politicalPrisoners.length} political prisoners
        </div>
      )}
    </motion.div>
  );
}

// Mosaic grid with 3x3 = 9 cells
interface PrisonerMosaicProps {
  onHighlightChange?: (prisoner: { name: string; age: number | null } | null) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  navigateRef?: React.MutableRefObject<{ prev: () => void; next: () => void } | null>;
}

function PrisonerMosaic({ onHighlightChange, searchQuery, onClearSearch, navigateRef }: PrisonerMosaicProps) {
  const TOTAL_CELLS = 9;
  const ACTIVE_CELLS = Math.min(TOTAL_CELLS, politicalPrisoners.length);

  // Initialize with unique prisoners, pad with empty cells if we have fewer prisoners than the grid
  const [currentIndices, setCurrentIndices] = useState<number[]>(
    Array.from({ length: TOTAL_CELLS }, (_, i) => (i < ACTIVE_CELLS ? i : -1))
  );
  const [currentCell, setCurrentCell] = useState(0);
  const [nextPrisonerPool, setNextPrisonerPool] = useState(ACTIVE_CELLS);
  const [isPaused, setIsPaused] = useState(false);
  const [searchHighlightCell, setSearchHighlightCell] = useState<number | null>(null);

  // Keep refs so external navigation always uses the latest state
  const currentCellRef = useRef(0);
  const currentIndicesRef = useRef(currentIndices);

  useEffect(() => {
    currentCellRef.current = currentCell;
  }, [currentCell]);

  useEffect(() => {
    currentIndicesRef.current = currentIndices;
  }, [currentIndices]);

  // Fuzzy search - allows close matches like "george" matching "giorgi"
  const fuzzyMatch = (name: string, query: string): boolean => {
    const normalizedName = name.toLowerCase().replace(/[^a-z]/g, '');
    const normalizedQuery = query.toLowerCase().replace(/[^a-z]/g, '');
    
    if (!normalizedQuery) return false;
    
    // Direct substring match
    if (normalizedName.includes(normalizedQuery)) return true;
    
    // Handle common Georgian/English variations
    const variations: Record<string, string[]> = {
      'george': ['giorgi', 'giorge', 'georgii'],
      'giorgi': ['george', 'giorge', 'georgii'],
      'david': ['davit', 'daviti'],
      'davit': ['david', 'daviti'],
      'nicholas': ['nikoloz', 'nika', 'niko'],
      'nikoloz': ['nicholas', 'nika', 'niko'],
      'alexander': ['aleksandre', 'sandro'],
      'aleksandre': ['alexander', 'sandro'],
    };
    
    // Check variations
    const queryVariations = variations[normalizedQuery] || [];
    for (const variant of queryVariations) {
      if (normalizedName.includes(variant)) return true;
    }
    
    // Check if query matches start of any word in name
    const nameWords = name.toLowerCase().split(/\s+/);
    for (const word of nameWords) {
      if (word.startsWith(normalizedQuery)) return true;
    }
    
    return false;
  };

  // Handle search - find match and highlight without removing others
  useEffect(() => {
    if (searchQuery) {
      // First check if match exists in current view
      const matchInView = currentIndices.findIndex(idx => 
        idx >= 0 && fuzzyMatch(politicalPrisoners[idx].name, searchQuery)
      );
      
      if (matchInView >= 0) {
        setSearchHighlightCell(matchInView);
        setCurrentCell(matchInView);
        setIsPaused(true);
      } else {
        // Find in all prisoners and swap into center
        const globalMatchIndex = politicalPrisoners.findIndex(p => fuzzyMatch(p.name, searchQuery));
        if (globalMatchIndex >= 0) {
          const centerCell = 4;
          setCurrentIndices(prev => {
            const newIndices = [...prev];
            newIndices[centerCell] = globalMatchIndex;
            return newIndices;
          });
          setSearchHighlightCell(centerCell);
          setCurrentCell(centerCell);
          setIsPaused(true);
        } else {
          setSearchHighlightCell(null);
        }
      }
    } else {
      setSearchHighlightCell(null);
      setIsPaused(false);
    }
  }, [searchQuery, currentIndices]);

  // Rotate highlight every 5s; only swap in new prisoners if we have more prisoners than visible cells
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      if (politicalPrisoners.length > TOTAL_CELLS) {
        setCurrentIndices((prev) => {
          const newIndices = [...prev];
          let nextPrisoner = nextPrisonerPool % politicalPrisoners.length;

          while (newIndices.includes(nextPrisoner)) {
            nextPrisoner = (nextPrisoner + 1) % politicalPrisoners.length;
          }

          newIndices[currentCell] = nextPrisoner;
          return newIndices;
        });

        setNextPrisonerPool((prev) => prev + 1);
      }

      const nextCell = (currentCell + 1) % Math.max(1, ACTIVE_CELLS);
      setCurrentCell(nextCell);
    }, 5000);

    return () => clearInterval(interval);
  }, [ACTIVE_CELLS, currentCell, nextPrisonerPool, isPaused]);

  // Notify parent of current highlighted prisoner
  useEffect(() => {
    if (onHighlightChange) {
      const highlightedIndex = currentIndices[currentCell];
      if (highlightedIndex >= 0 && highlightedIndex < politicalPrisoners.length) {
        const prisoner = politicalPrisoners[highlightedIndex];
        onHighlightChange({ name: prisoner.name, age: prisoner.age });
      } else {
        onHighlightChange(null);
      }
    }
  }, [currentCell, currentIndices, onHighlightChange]);

  // Handle tile click - highlight that person and clear search
  const handleTileClick = (cellIndex: number) => {
    setCurrentCell(cellIndex);
    setSearchHighlightCell(null);
    setIsPaused(true);
    if (onClearSearch) {
      onClearSearch();
    }
    // Resume auto-rotation after 10 seconds
    setTimeout(() => setIsPaused(false), 10000);
  };

  // Expose navigation methods to parent - swap the featured prisoner so each click visibly changes the mosaic
  useEffect(() => {
    if (!navigateRef) return;

    const swapFeatured = (direction: -1 | 1) => {
      const cell = currentCellRef.current;
      const indices = currentIndicesRef.current;

      if (!Number.isFinite(cell) || cell < 0 || cell >= TOTAL_CELLS) return;
      const currentGlobal = indices[cell];
      if (currentGlobal < 0) return;

      const len = politicalPrisoners.length;
      if (len <= 1) return;

      let candidate = (currentGlobal + direction + len) % len;
      let attempts = 0;
      while (indices.includes(candidate) && attempts < len) {
        candidate = (candidate + direction + len) % len;
        attempts++;
      }

      setCurrentIndices((prev) => {
        const next = [...prev];
        next[cell] = candidate;
        return next;
      });

      setIsPaused(true);
      setSearchHighlightCell(null);
      if (onClearSearch) onClearSearch();
      window.setTimeout(() => setIsPaused(false), 10000);
    };

    navigateRef.current = {
      prev: () => swapFeatured(-1),
      next: () => swapFeatured(1),
    };

    return () => {
      navigateRef.current = null;
    };
  }, [navigateRef, onClearSearch]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Mosaic grid - 3x3 with square cells */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="w-full max-w-[min(100%,100vh)] aspect-square"
      >
        <div className="grid grid-cols-3 grid-rows-3 gap-0 w-full h-full">
          {currentIndices.map((prisonerIndex, cellIndex) => {
            const isFeatured = cellIndex === currentCell;
            const isSearchMatch = cellIndex === searchHighlightCell;

            if (prisonerIndex < 0) {
              return (
                <div
                  key={cellIndex}
                  className="relative overflow-hidden bg-[#E8EFF7]"
                />
              );
            }

            const prisoner = politicalPrisoners[prisonerIndex];
            const hasImage = prisoner.image;

            return (
              <motion.div
                key={cellIndex}
                className="relative overflow-hidden group cursor-pointer"
                onClick={() => handleTileClick(cellIndex)}
                animate={{
                  filter: isFeatured || isSearchMatch ? 'grayscale(0%) contrast(1)' : 'grayscale(100%) contrast(1.1)',
                  scale: isSearchMatch ? 1.05 : 1,
                  zIndex: isSearchMatch ? 20 : 1,
                }}
                transition={{ duration: 0.4 }}
                whileHover={{
                  filter: 'grayscale(0%) contrast(1)',
                  scale: 1.02,
                  zIndex: 10,
                }}
                style={{
                  boxShadow: isSearchMatch ? '0 0 20px rgba(74, 123, 167, 0.6), inset 0 0 0 3px rgba(74, 123, 167, 0.8)' : 'none',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={prisonerIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-[#E8EFF7]"
                  >
                    {hasImage ? (
                      <ImageWithFallback
                        src={prisoner.image}
                        alt={prisoner.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      // Artful sketch placeholder for prisoners without photos
                      <div className="w-full h-full flex flex-col items-center justify-center bg-[#E8EFF7] relative overflow-hidden">
                        {/* Sketch-style profile silhouette */}
                        <svg 
                          viewBox="0 0 100 120" 
                          className="absolute inset-0 w-full h-full opacity-20"
                          fill="none"
                          stroke="#0B1F3F"
                          strokeWidth="0.5"
                          strokeLinecap="round"
                        >
                          {/* Artistic profile sketch - side view */}
                          {/* Forehead and brow */}
                          <path d="M55 25 Q58 22, 60 25 Q65 28, 66 35" />
                          {/* Nose */}
                          <path d="M66 35 Q72 42, 70 50 Q68 52, 65 51" />
                          {/* Upper lip */}
                          <path d="M65 51 Q63 52, 62 55" />
                          {/* Lower lip */}
                          <path d="M62 55 Q64 58, 62 60" />
                          {/* Chin */}
                          <path d="M62 60 Q58 68, 52 72 Q48 74, 45 73" />
                          {/* Jaw line */}
                          <path d="M45 73 Q38 70, 35 62 Q34 55, 35 48" />
                          {/* Ear hint */}
                          <path d="M35 48 Q32 45, 33 40 Q34 36, 37 35" />
                          {/* Back of head */}
                          <path d="M37 35 Q38 28, 42 22 Q48 18, 55 20" />
                          {/* Hair strokes */}
                          <path d="M45 18 Q50 12, 58 15" strokeWidth="0.3" />
                          <path d="M42 20 Q47 14, 55 16" strokeWidth="0.3" />
                          <path d="M48 16 Q54 10, 60 18" strokeWidth="0.3" />
                          {/* Neck */}
                          <path d="M45 73 Q44 82, 42 95" />
                          <path d="M52 72 Q54 80, 55 95" />
                          {/* Collar/shoulder hints */}
                          <path d="M42 95 Q35 97, 25 100" strokeWidth="0.3" />
                          <path d="M55 95 Q65 97, 78 100" strokeWidth="0.3" />
                          {/* Eye hint */}
                          <path d="M58 38 Q60 37, 62 38" strokeWidth="0.4" />
                        </svg>
                        
                        {/* Large centered name */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                          <div className="text-lg md:text-2xl lg:text-3xl font-light text-[#0B1F3F] leading-tight tracking-wide">
                            {prisoner.name}
                          </div>
                          {prisoner.age && (
                            <div className="text-xs md:text-sm text-[#0B1F3F]/40 mt-2">
                              Age {prisoner.age}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Hover overlay with name (only for photos) */}
                {hasImage && (
                  <div className="absolute inset-0 bg-[#0B1F3F]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <div className="text-white text-xs md:text-sm leading-tight">
                      <div className="font-medium">{prisoner.name}</div>
                      {prisoner.age && <div className="opacity-70">Age {prisoner.age}</div>}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

// Helper function to find the next upcoming birthday
function getNextBirthday(): { prisoner: typeof politicalPrisoners[0]; targetDate: Date; fullDate: string; nextAge: number | null } | null {
  const today = new Date();
  const currentYear = today.getFullYear();
  
  let closestBirthday: { prisoner: typeof politicalPrisoners[0]; targetDate: Date; fullDate: string; nextAge: number | null } | null = null;
  
  for (const prisoner of politicalPrisoners) {
    if (!prisoner.birthday) continue;
    
    const [month, day] = prisoner.birthday.split('-').map(Number);
    
    // Create date for this year's birthday
    let birthdayThisYear = new Date(currentYear, month - 1, day);
    let yearsFromNow = 0;
    
    // If birthday already passed this year, use next year
    if (birthdayThisYear < today) {
      birthdayThisYear = new Date(currentYear + 1, month - 1, day);
      yearsFromNow = 1;
    }
    
    // Calculate next age: current age + 1 (or +2 if birthday passed)
    const nextAge = prisoner.age !== null ? prisoner.age + 1 + yearsFromNow : null;
    
    // Calculate birth year from current age
    const birthYear = prisoner.age !== null ? currentYear - prisoner.age - yearsFromNow : null;
    
    if (!closestBirthday || birthdayThisYear.getTime() < closestBirthday.targetDate.getTime()) {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      closestBirthday = {
        prisoner,
        targetDate: birthdayThisYear,
        fullDate: birthYear ? `${monthNames[month - 1]} ${day}, ${birthYear}` : `${monthNames[month - 1]} ${day}`,
        nextAge
      };
    }
  }
  
  return closestBirthday;
}

// Hook for real-time countdown with auto-refresh when birthday passes
function useBirthdayCountdown() {
  const [birthdayData, setBirthdayData] = useState(getNextBirthday);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    const calculateCountdown = () => {
      if (!birthdayData) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      
      const now = new Date();
      const diff = birthdayData.targetDate.getTime() - now.getTime();
      
      // Birthday has passed - get the next one
      if (diff <= 0) {
        setBirthdayData(getNextBirthday());
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };
    
    setCountdown(calculateCountdown());
    
    const interval = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    
    return () => clearInterval(interval);
  }, [birthdayData]);
  
  return { birthdayData, countdown };
}

export function SolidarityGraphic() {
  const [selectedActions, setSelectedActions] = useState<number[]>([]);
  const [showDescription, setShowDescription] = useState<number | null>(null);
  const [showDonatePopup, setShowDonatePopup] = useState(false);
  const [highlightedPrisoner, setHighlightedPrisoner] = useState<{ name: string; age: number | null } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigateRef = useRef<{ prev: () => void; next: () => void } | null>(null);

  const handlePrev = () => {
    if (!navigateRef.current) {
      toast('Mosaic is still loading. Try again in a second.');
      return;
    }
    navigateRef.current.prev();
  };

  const handleNext = () => {
    if (!navigateRef.current) {
      toast('Mosaic is still loading. Try again in a second.');
      return;
    }
    navigateRef.current.next();
  };

  const { birthdayData: nextBirthday, countdown } = useBirthdayCountdown();

  const toggleAction = (id: number) => {
    if (selectedActions.includes(id)) {
      setSelectedActions(selectedActions.filter((a) => a !== id));
    } else {
      setSelectedActions([...selectedActions, id]);
    }
  };

  // Split name into first and last
  const getNameParts = (fullName: string) => {
    const parts = fullName.split(' ');
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    return { firstName, lastName };
  };

  return (
    <div className="min-h-screen bg-[#E8EFF7] text-[#0B1F3F]">
      {/* Full Screen Centered Container */}
      <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-8">
        
        {/* Main Content - Profile Silhouette with Name */}
        <div className="relative w-full max-w-4xl flex items-center justify-center">
          {/* Name - Left side, stacked */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-left z-10 pl-4 md:pl-8">
            <AnimatePresence mode="wait">
              {highlightedPrisoner && (
                <motion.div
                  key={highlightedPrisoner.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="flex flex-col"
                >
                  {(() => {
                    const { firstName, lastName } = getNameParts(highlightedPrisoner.name);
                    return (
                      <>
                        <div className="text-3xl md:text-5xl lg:text-6xl font-light text-[#0B1F3F] tracking-wide leading-tight">
                          {firstName}
                        </div>
                        <div className="text-3xl md:text-5xl lg:text-6xl font-light text-[#0B1F3F] tracking-wide leading-tight">
                          {lastName}
                        </div>
                        <div className="h-6 md:h-8 mt-2">
                          {highlightedPrisoner.age && (
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.4 }}
                              className="text-lg md:text-xl text-[#0B1F3F]/50"
                            >
                              Age {highlightedPrisoner.age}
                            </motion.div>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Photo Card with Profile Silhouette - Center/Right */}
          <div className="flex justify-center md:justify-end w-full md:pr-12">
            <div className="flex flex-col items-center">
              {/* Photo Card Container */}
              <div className="relative w-48 h-64 md:w-64 md:h-80 lg:w-72 lg:h-96 bg-gradient-to-b from-[#E8E4DC] to-[#D4CFC5] rounded-lg shadow-lg border border-[#0B1F3F]/10 overflow-hidden">
                {/* Profile Silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg 
                    viewBox="0 0 80 130" 
                    className="w-40 h-56 md:w-52 md:h-72 lg:w-60 lg:h-80"
                    fill="none"
                  >
                    {/* Refined profile with gentle nose and softer jawline */}
                    <path
                      d="M22 12
                         C28 10 36 10 44 14
                         C52 18 58 26 60 36
                         C62 46 61 52 60 56
                         C59 60 60 64 62 68
                         C65 74 68 80 68 84
                         C68 86 67 88 65 89
                         C63 90 62 91 62 93
                         C62 95 63 97 64 99
                         C65 101 65 104 63 107
                         C60 111 56 114 52 116
                         C50 117 49 119 48 122
                         L48 128"
                      stroke="#0B1F3F"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </div>
                
                {/* Subtle texture overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-50" />
              </div>
              
              {/* Name and Age Below Card */}
              <div className="mt-4 text-center">
                <h3 className="text-lg md:text-xl font-medium tracking-wide text-[#0B1F3F]">
                  {highlightedPrisoner ? highlightedPrisoner.name : '—'}
                </h3>
                <p className="text-sm md:text-base text-[#0B1F3F]/60 mt-1">
                  {highlightedPrisoner?.age ? `Age ${highlightedPrisoner.age}` : 'Age unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Prisoner Mosaic - Below the photo card */}
        <div className="mt-12 w-full max-w-6xl">
          <PrisonerMosaic 
            onHighlightChange={setHighlightedPrisoner} 
            navigateRef={navigateRef}
            searchQuery={searchQuery}
          />
        </div>
        
        {/* Navigation & Search Row - Centered below mosaic */}
        <div className="flex justify-center items-center gap-8 mt-8">
          {/* Left Arrow */}
          <button 
            onClick={handlePrev}
            className="p-2 text-[#0B1F3F]/40 hover:text-[#0B1F3F] transition-colors"
            aria-label="Previous prisoner"
            type="button"
          >
            <svg className="w-8 h-4" fill="none" stroke="currentColor" viewBox="0 0 32 16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 2L12 8L20 14" />
            </svg>
          </button>
          
          {/* Search Bar - Center */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 md:w-56 px-3 py-1 pl-8 text-sm bg-transparent placeholder:text-[#4A7BA7]/50 text-[#4A7BA7] focus:outline-none border-b border-[#4A7BA7]/30 focus:border-[#4A7BA7]/60 transition-colors"
            />
            <svg 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4A7BA7]/50"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#4A7BA7]/50 hover:text-[#4A7BA7] transition-colors"
                type="button"
                aria-label="Clear search"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Right Arrow */}
          <button 
            onClick={handleNext}
            className="p-2 text-[#0B1F3F]/40 hover:text-[#0B1F3F] transition-colors"
            aria-label="Next prisoner"
            type="button"
          >
            <svg className="w-8 h-4" fill="none" stroke="currentColor" viewBox="0 0 32 16">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L20 8L12 14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Section - Content */}
      <div className="px-8 md:px-16 lg:px-20 py-16 border-t border-[#0B1F3F]/10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-12 relative"
          >
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#4A7BA7] via-[#4A7BA7]/50 to-transparent" />
            
            <h1 className="relative">
              <span className="block text-5xl md:text-6xl lg:text-7xl tracking-tighter font-bold text-[#0B1F3F] leading-[0.85]">
                SOLIDARITY
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl tracking-tight font-extralight text-[#0B1F3F]/30 leading-[0.9] -mt-2 md:-mt-3">
                PLEDGE
              </span>
            </h1>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-0.5 w-24 bg-gradient-to-r from-[#4A7BA7] to-transparent mt-4 origin-left"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="w-20 h-px bg-[#4A7BA7]/60 mb-8" />
            <p className="text-lg md:text-xl text-[#0B1F3F]/70 max-w-lg leading-relaxed font-light">
              Political prisoners and their families need our support. Choose how you'll take action.
            </p>
          </motion.div>

          {/* Stark Fact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12 p-6 rounded-sm border-l-2 border-[#4A7BA7] bg-[#4A7BA7]/5"
          >
            <p className="text-base md:text-lg text-[#0B1F3F] font-light leading-relaxed italic">
              "Georgia has more political prisoners per capita than Russia."
            </p>
          </motion.div>

          {/* Upcoming Birthday Indicator */}
          {nextBirthday && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mb-12 p-5 rounded-sm bg-gradient-to-r from-[#4A7BA7]/10 to-transparent border border-[#4A7BA7]/20 cursor-pointer hover:bg-[#4A7BA7]/15 transition-colors duration-200"
              onClick={() => {
                setSearchQuery(nextBirthday.prisoner.name);
                setTimeout(() => setSearchQuery(''), 10000);
              }}
            >
              <div className="text-xl md:text-2xl text-[#0B1F3F]">
                <span className="font-medium">{nextBirthday.prisoner.name}</span>
                {nextBirthday.nextAge && (
                  <span className="text-[#0B1F3F]/50 font-light"> turns {nextBirthday.nextAge}</span>
                )}
                <span className="text-[#0B1F3F]/50 font-light">
                  {countdown.days === 0 
                    ? ' today.' 
                    : countdown.days === 1 
                      ? ' in 1 day.' 
                      : ` in ${countdown.days} days.`}
                </span>
              </div>
              <div className="text-sm text-[#0B1F3F]/50 mt-2">
                {nextBirthday.fullDate}
              </div>
            </motion.div>
          )}

          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="space-y-2 mb-12"
          >
            {pledgeActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <button
                  onClick={() => action.description ? setShowDescription(action.id) : toggleAction(action.id)}
                  className="group relative w-full text-left py-5 border-b border-[#0B1F3F]/8 hover:border-[#0B1F3F]/20 transition-all duration-300 block rounded-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="relative w-5 h-5 rounded-sm border border-[#0B1F3F]/30 group-hover:border-[#0B1F3F] transition-colors duration-300">
                        {selectedActions.includes(action.id) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute inset-0.5 bg-[#4A7BA7] rounded-sm"
                          />
                        )}
                      </div>
                      <span
                        className={`text-sm md:text-base tracking-[0.1em] transition-all duration-300 ${ 
                          selectedActions.includes(action.id)
                            ? 'text-[#0B1F3F]'
                            : 'text-[#0B1F3F]/60 group-hover:text-[#0B1F3F]/90'
                        }`}
                      >
                        {action.text}
                      </span>
                    </div>
                    <span className="text-xs text-[#0B1F3F]/25 font-mono">
                      {String(action.id).padStart(2, '0')}
                    </span>
                  </div>
                </button>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-3 gap-8 pt-12 border-t border-[#0B1F3F]/8"
          >
            <div>
              <div className="text-3xl md:text-4xl font-light mb-2 text-[#0B1F3F]">1,247</div>
              <div className="text-xs tracking-[0.15em] text-[#0B1F3F]/35">Imprisoned</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light mb-2 text-[#0B1F3F]">892</div>
              <div className="text-xs tracking-[0.15em] text-[#0B1F3F]/35">Families</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-light mb-2 text-[#0B1F3F]">
                {selectedActions.length}
              </div>
              <div className="text-xs tracking-[0.15em] text-[#0B1F3F]/35">Your Pledges</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="border-t border-[#0B1F3F]/8 px-8 md:px-16 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-[10px] tracking-[0.25em] text-[#0B1F3F]/35">
            © 2025 Solidarity Movement
          </div>
          <div className="flex flex-wrap gap-6 md:gap-8 text-[10px] tracking-[0.25em] text-[#0B1F3F]/35">
            <a 
              href="https://www.theguardian.com/commentisfree/2025/sep/27/prison-cell-georgia-implore-europe-abandon-russia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0B1F3F] transition-colors underline underline-offset-4 decoration-[#4A7BA7]/30"
            >
              Mzia's Letter
            </a>
            <a 
              href="https://www.lemonde.fr/en/international/article/2025/05/28/i-promise-not-to-give-in-to-despair-in-georgia-the-fight-of-imprisoned-pro-european-protesters_6741755_4.html"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0B1F3F] transition-colors underline underline-offset-4 decoration-[#4A7BA7]/30"
            >
              Mothers' Campaign
            </a>
            <button className="hover:text-[#0B1F3F] transition-colors">Donate</button>
            <button className="hover:text-[#0B1F3F] transition-colors">Letters</button>
            <button className="hover:text-[#0B1F3F] transition-colors">Legal</button>
          </div>
        </div>
      </div>

      {/* Side Panel for Description */}
      <AnimatePresence>
        {showDescription && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDescription(null)}
              className="fixed inset-0 bg-[#0B1F3F]/50 backdrop-blur-sm z-40"
            />
            {/* Side Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[600px] bg-[#F5F8FB] z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-8 md:p-12">
                {/* Close Button */}
                <button
                  onClick={() => setShowDescription(null)}
                  className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-sm border border-[#0B1F3F]/20 hover:bg-[#0B1F3F] hover:text-white transition-colors"
                >
                  <span className="text-xl">×</span>
                </button>

                {/* Content */}
                {pledgeActions.find(a => a.id === showDescription)?.description && (
                  <div className="space-y-8">
                    <div>
                      <div className="text-xs tracking-[0.3em] text-[#0B1F3F]/35 mb-4">
                        Action 05
                      </div>
                      <h2 className="text-4xl md:text-5xl font-light text-[#0B1F3F] leading-tight mb-8">
                        {pledgeActions.find(a => a.id === showDescription)?.text}
                      </h2>
                      <div className="w-16 h-px bg-[#4A7BA7]/60" />
                    </div>

                    <div className="space-y-6">
                      <p className="text-lg text-[#0B1F3F]/80 leading-relaxed font-light">
                        {pledgeActions.find(a => a.id === showDescription)?.description}
                      </p>
                      {pledgeActions.find(a => a.id === showDescription)?.disclaimer && (
                        <div className="p-6 rounded-sm border border-[#0B1F3F]/15 bg-[#E8EFF7]">
                          <p className="text-sm text-[#0B1F3F]/70 leading-relaxed">
                            {pledgeActions.find(a => a.id === showDescription)?.disclaimer}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="pt-8 space-y-4">
                      <a
                        href={pledgeActions.find(a => a.id === showDescription)?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#0B1F3F] text-white text-center py-5 px-8 text-sm tracking-[0.25em] hover:bg-[#4A7BA7] transition-all duration-300 rounded-sm"
                      >
                        Donate Directly to Freedom Fund
                      </a>
                      <button
                        onClick={() => setShowDonatePopup(true)}
                        className="block w-full bg-[#4A7BA7] text-white text-center py-5 px-8 text-sm tracking-[0.25em] hover:bg-[#0B1F3F] transition-all duration-300 rounded-sm"
                      >
                        Donate Through Us
                      </button>
                      <button
                        onClick={() => {
                          toggleAction(showDescription);
                          setShowDescription(null);
                        }}
                        className="block w-full border border-[#0B1F3F]/20 text-[#0B1F3F] text-center py-5 px-8 text-sm tracking-[0.25em] hover:bg-[#0B1F3F] hover:text-white transition-all duration-300 rounded-sm"
                      >
                        Add to My Pledge
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Donate Through Us Popup */}
      <AnimatePresence>
        {showDonatePopup && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDonatePopup(false)}
              className="fixed inset-0 bg-[#0B1F3F]/60 backdrop-blur-sm z-[60]"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[600px] bg-[#F5F8FB] z-[70] shadow-2xl rounded-sm"
            >
              <div className="p-8 md:p-12">
                {/* Close Button */}
                <button
                  onClick={() => setShowDonatePopup(false)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-sm border border-[#0B1F3F]/20 hover:bg-[#0B1F3F] hover:text-white transition-colors"
                >
                  <span className="text-xl">×</span>
                </button>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs tracking-[0.3em] text-[#0B1F3F]/35 mb-4">
                      Donation Information
                    </div>
                    <h3 className="text-3xl md:text-4xl font-light text-[#0B1F3F] leading-tight mb-6">
                      About Our Organization
                    </h3>
                    <div className="w-16 h-px bg-[#4A7BA7]/60" />
                  </div>

                  <div className="p-6 rounded-sm border border-[#0B1F3F]/15 bg-[#E8EFF7]">
                    <p className="text-base text-[#0B1F3F]/80 leading-relaxed font-light">
                      <BrandWordmark variant="navy" size="sm" className="inline" /> is a joint project of <BrandWordmark variant="navy" size="sm" className="inline" />, Inc. and <BrandWordmark variant="navy" size="sm" className="inline" />, Stichting. It is the Stichting alone that can contribute to the personal legal fees of political prisoners. The Stichting cannot accept contributions at this time.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowDonatePopup(false)}
                    className="w-full border border-[#0B1F3F]/20 text-[#0B1F3F] text-center py-5 px-8 text-sm tracking-[0.25em] hover:bg-[#0B1F3F] hover:text-white transition-all duration-300 rounded-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
