const initalState={
    images:[
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/image5.jpg",
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/FINALIMAGE2.jpg",
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/kokedama.jpg",
    "https://plant-giene-stack-images.s3.ap-south-1.amazonaws.com/luckybamboo.jpg"
  ],
}

  const HomeReducer = (state = initalState, action) => {
    switch (action.type) {
        default:
            return state;
    }
  };

  export default HomeReducer;