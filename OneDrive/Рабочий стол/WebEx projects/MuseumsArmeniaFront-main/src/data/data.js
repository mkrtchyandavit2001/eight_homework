export const  hmoePageTopSlide = [
    {
        img: require('../images/home_slide_img_1.jpg'),
        txt: 'ԱՅՑԵԼԵՔ ՀԱՅԱՍՏԱՆԻ ԹԱՆԳԱՐԱՆՆԵՐ',
    },

    {
        img: require('../images/home_slide_img_2.jpg'),
        txt: 'ԲԱՑԱՀԱՅՏԵՔ ԳԵՂԵՑԻԿԸ',
    },

    {
        img: require('../images//home_slide_img_3.jpg'),
        txt: 'ԸՆԿՂՄՎԵՔ ՄՇԱԿՈՒՅԹԻ ՄԵՋ',
    },

    {
        img: require('../images/home_slide_img_4.jpg'),
        txt: 'ՃԱՆԱՊԱՐՀՈՐԴԵՔ ԺԱՄԱՆԱԿԻ ՄԻՋՈՎ'
    },
]


// =========================single ticket===============================






// ===========homePage_news_section==============================

export const home_page_news_section_data = [
    {
        id: '1',
        category: ['Առանց կատեգորիա'],
        date: '20.10.11',
        txt: 'Ներդրումների մասնակի վերադարձի համակարգը կնպաստի Հայաստանի պատշաճ դիրքավորմանը միջազգային կինոհարթակներում',
        img: require('../images/news_img1.png')
    },

    {
        id: '2',
        category: ['Հավաքածուներ', 'Ցուցադրություններ'],
        date: '20.08.21',
        txt: '«Ինքնության մասունքներ կորուսյալ Գարդմանից, Շիրվանից և Նախիջևանից» խորագրով ժամանակավոր ցուցադրություն',
        img: require('../images/news_img2.png')
    },

    {
        id: '3',
        category: ['Առանց կատեգորիա'],
        date: '10.10.24',
        txt: 'Տաթևի և Տաթևի Մեծ անապատ վանական համալիրները, Որոտան գետի կիրճը ՅՈՒՆԵՍԿՕ-ի հովանու ներքո․ նախապատրաստվում է հայտ',
        img: require('../images/news_img3.png')
    },
]


// =================homePage_museum_section=====================


export const homePage_museum_section_data = [
    {
        id: '1',
        time: '11.00 - 14.15',
        location: ' Երևան, «Զորագյուղ» ազգագրական թաղամաս,15,16',
        name: 'Հայ և ռուս ժողովուրդների բարեկամության թանգարան',
        img: require('../images/home_slide_img_1.jpg')
    },

    {
        id: '2',
        time: '11.00 - 14.15',
        location: ' Երևան, «Զորագյուղ» ազգագրական թաղամաս,15,16',
        name: 'Հայ և ռուս ժողովուրդների բարեկամության թանգարան',
        img: require('../images/home_slide_img_2.jpg')
    },

    {
        id: '3',
        time: '11.00 - 14.15',
        location: ' Երևան, «Զորագյուղ» ազգագրական թաղամաս,15,16',
        name: 'Հայ և ռուս ժողովուրդների բարեկամության թանգարան',
        img: require('../images/home_slide_img_3.jpg')
    },

    {
        id: '4',
        time: '11.00 - 14.15',
        location: ' Երևան, «Զորագյուղ» ազգագրական թաղամաս,15,16',
        name: 'Հայ և ռուս ժողովուրդների բարեկամության թանգարան',
        img: require('../images/home_slide_img_4.jpg')
    },
]


export const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1440 },
      items: 3,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 510, min: 0 },
      items: 1,
    },
  };


//   =======================souvenirs======================================


export const souvenirsData = [
    {
        id: '1',
        name: 'Նամակներ բանտ',
        value: '2000',
        img: require('../images/bant.png')
    },

    {
        id: '2',
        name: 'Երկարաթև շապիկ',
        value: '2500',
        img: require('../images/shapik.png')
    },

    {
        id: '3',
        name: 'Բաժակ',
        value: '4000',
        img: require('../images/bajak.jpeg')
    },

    {
        id: '4',
        name: 'Սերգեյ Փարաջանովը Յուրի Մեչիտովի լուսանկարներում և պատմություններում',
        value: '8000',
        img: require('../images/parjanov.png')
    },

    {
        id: '5',
        name: 'Սերգեյ Փարաջանովը Յուրի Մեչիտովի լուսանկարներում և պատմություններում',
        value: '10000',
        img: require('../images/parjanov.png')
    },
]


export const responsive2 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 510, min: 0 },
      items: 1,
    },
  };


//   ==================================================================================

export const privateTicketsData = {
    regions: [

        {
            id: '0',
            nameKey: 'bolory'
        },

        {
            id: '1',
            nameKey: 'yerevan'
        },

        {
            id: '2',
            nameKey: 'aragatsotn'
        },

        {
            id: '3',
            nameKey: 'ararat'
        },

        {
            id: '4',
            nameKey: 'armavir'
        },

        {
            id: '5',
            nameKey: 'gegharkunik'
        },
        {
            id: '6',
            nameKey: 'kotayk'
        },
        {
            id: '7',
            nameKey: 'lori'
        },
        {
            id: '8',
            nameKey: 'shirak'
        },
        {
            id: '9',
            nameKey: 'syunik'
        },
        {
            id: '10',
            nameKey: 'tavush'
        },
        {
            id: '11',
            nameKey: 'vayots_dzor'
        },
    ],

    museums: [
        {
                id: '1',
                region_name: 'vayots_dzor',
                name: 'Hovhannes Tumanyani Tun Tangaran',
                tickets: [

                    {
                        id: '1',
                        type: 'standart',
                        price: 3000,
                        min: 1,
                        max: null
                    },
                
                    {
                        id: '2',
                        type: 'discounted',
                        price: 3500,
                        min: 1,
                        max: 10
                    },
                
                    {
                        id: '3',
                        type: 'free',
                        price: 0,
                        min: 1,
                        max: 12
                    },
                  
                 ]
        },

        {
                id: '2',
                region_name: 'tavush',
                name: 'Stepan Shahinyani Tun Tangaran',
                tickets: [

                    {
                        id: '1',
                        type: 'standart',
                        price: 3000,
                        min: 1,
                        max: 10
                    },
                
                    {
                        id: '2',
                        type: 'discounted',
                        price: 3500,
                        min: 1,
                        max: 10
                    },
                
                    {
                        id: '3',
                        type: 'free',
                        price: 0,
                        min: 1,
                        max: 10
                    },
                  
                 ]
        },

        {
            id: '3',
            region_name: 'syunik',
            name: 'Patmutyan Tangaran',
            tickets: [

                {
                    id: '1',
                    type: 'standart',
                    price: 3000,
                    min: 1,
                    max: 10
                },
            
                {
                    id: '2',
                    type: 'discounted',
                    price: 3500,
                    min: 1,
                    max: 10
                },
            
                {
                    id: '3',
                    type: 'free',
                    price: 0,
                    min: 1,
                    max: 10
                },
              
             ]
        },

        {
            id: '4',
            region_name: 'lori',
            name: 'Sevani tangaran',
            tickets: [

                {
                    id: '1',
                    type: 'standart',
                    price: 3000,
                    min: 1,
                    max: 10
                },
            
                {
                    id: '2',
                    type: 'discounted',
                    price: 3500,
                    min: 1,
                    max: 10
                },
            
                {
                    id: '3',
                    type: 'free',
                    price: 0,
                    min: 1,
                    max: 10
                },
              
             ]
        },


    ],

   
}


// ===============================================



export const responsiveEventsSlide = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
      slidesToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 720 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 510, min: 0 },
      items: 1,
    },
  };