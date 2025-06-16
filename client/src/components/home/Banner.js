import React from 'react'
import Carousel from 'react-material-ui-carousel'
import "./banner.css"


const data = [
  "/img1.webp",
  "/img2.webp",
  "/img3.webp",
  "/img4.webp"
];



const Banner = () => {

   

   

  return (
    
             <Carousel
                 className="carasousel"
                 autoPlay={true}
                 animation="slide"
                 indicators={false}
                 navButtonsAlwaysVisible={true}
                 cycleNavigation={true}
                 navButtonsProps={{
                     style: {
                         background: "#fff",
                         color: "#494949",
                         borderRadius: 0,
                         marginTop: -22,
                         height: "104px",
                     }
                 }}>
                    
                    

                 {
                     data.map((imag, i) => {
                         return (
                          
                                
                                 <img src={imag} alt="img" key={i} className="banner_img" />
                             
                         )
                     })
                 }
                  
             </Carousel>
     )
}

export default Banner