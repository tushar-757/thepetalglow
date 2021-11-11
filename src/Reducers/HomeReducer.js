const initalState={
    images:[
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/image5.jpg",
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/FINALIMAGE2.jpg",
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/kokedama.jpg",
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/luckybamboo.jpg"
  ],
  BestSellingData:[
    {
        id:'1',
        name:"Areca Palm",
        type:"both indoor/outdoor",
        image:"https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/arecapalmM2.jpg",
        Count:250,
        prize:10
    },
    {
        id:'2',
        name:"Peace lily",
        type:"indoor",
        image:"https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        Count:150,
        prize:300
    },
    {
       id:'3',
        name:"like lily",
        type:"indoor",
        image:"https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        Count:150,
        prize:250
    },
    {
      id:'4',
        name:"Peace lily",
        type:"indoor",
        image:"https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        Count:150,
        prize:250
    },
    {
      id:'5',
        name:"Peace lily",
        type:"indoor",
        image:"https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        Count:150,
        prize:100
    },
    {
      id:'6',
        name:"Peace lily",
        type:"indoor",
        image:"https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
        Count:150,
        prize:150
    }
],
SeasonalPlants:[
    {
      id:'10',
      name:"Begonia",
      type:"both indoor/outdoor",
      image:"https://images.unsplash.com/photo-1604092146481-a64fdd7b6849?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      Count:250,
      prize:500
  },
  {
      id:'11',
      name:"Clematis",
      type:"indoor",
      image:"https://images.unsplash.com/photo-1559041881-b099a8b3ab37?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=694&q=80",
      Count:150,
      prize:300
  },
  {
     id:'12',
      name:"Coleus",
      type:"indoor",
      image:"https://images.unsplash.com/photo-1572424247927-0fd94ef0d138?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
      Count:150,
      prize:250
  },
  {
    id:'13',
      name:"Cone Flower",
      type:"indoor",
      image:"https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      Count:150,
      prize:250
  },
  {
    id:'14',
      name:"Cone Flower",
      type:"indoor",
      image:"https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      Count:150,
      prize:250
  },
  ],
  pots:[
    {
      id:'001',
      type:'plastic',
      price:50,
      image:'https://images.unsplash.com/photo-1528475635690-3dcb1205f55b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ],
  loading:false,
  item:{}
}

  const HomeReducer = (state = initalState, action) => {
    switch (action.type) {
      case "GET_ITEM":
        return { ...state,item:initalState.BestSellingData.filter((product) =>
           product.id === action.payload),loading:true
           };
       case 'GET_SEASONAL_ITEM':
         return   { ...state,item:initalState.SeasonalPlants.filter((product) =>
          product.id === action.payload)
          };
       case 'GET_POT':
         return   { ...state,item:initalState.pots.filter((product) =>
          product.id === action.payload)
          };
        default:
            return state;
    }
  };

  export default HomeReducer;