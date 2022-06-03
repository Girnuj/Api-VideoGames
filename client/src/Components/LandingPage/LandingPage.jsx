import React from 'react'
import './LandingPage.js'
import video from '../Video/video.mp4'
import { Container, Bg, VideoBg, Content, H1, P, Btn ,BtnGo } from './LandingPage.js'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <>
    <Container>
              <Bg>
                  <VideoBg autoPlay loop muted src={video}  type='video/mp4' />
              </Bg>
              <Content>
            <H1>Video Games Api</H1>
            <P>
            What's your favorite Game? 
            </P>
            <Btn>
              
      
               <Link to='/home'>
               <BtnGo>Find Out</BtnGo>
               </Link>
               
  
            </Btn>
          </Content>
          </Container>
      </>
  )
}

export default LandingPage