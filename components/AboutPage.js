
import React from 'react';
import { Box, Typography, Container, Grid, Button } from '@mui/material';
import { Fade, Slide } from 'react-awesome-reveal';
import { motion } from 'framer-motion'; 
import '../assets/css/About.css';

const AboutPage = () => {
  return (
    <Box className="about-container">
 
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Slide direction="up" delay={500}>
              <Typography variant="h2" className="about-header">
                Giới Thiệu Về Chúng Tôi
              </Typography>
            </Slide>
            <Fade delay={700}>
              <Typography variant="body1" className="about-description">
                Chúng tôi là một công ty chuyên cung cấp các dịch vụ tốt nhất cho khách hàng của mình. Với đội ngũ chuyên nghiệp và sáng tạo, chúng tôi luôn sẵn sàng đáp ứng mọi nhu cầu của bạn.
              </Typography>
            </Fade>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.img
              src={require('../assets/img/doingu.jpg')} 
              alt="About Us"
              className="about-image" 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            />
          </Grid>
        </Grid>
      </Container>

  
      <Container maxWidth="lg" className="mission-section">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <Typography variant="h4" className="mission-title">
            Sứ Mệnh Của Chúng Tôi
          </Typography>
          <Typography variant="body1" className="mission-description">
            Sứ mệnh của chúng tôi là mang đến những dịch vụ chất lượng cao, cải tiến không ngừng và trải nghiệm tuyệt vời cho tất cả khách hàng.
          </Typography>
        </motion.div>
      </Container>



      <Container maxWidth="lg" className="services-section">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <Typography variant="h4" className="mission-title">
            Các Dịch Vụ Của Chúng Tôi
          </Typography>
          <Grid container spacing={4} justifyContent="center">
    
            <Grid item xs={12} md={4}>
              <Box className="service-box">
                <motion.img
                  src={require('../assets/img/dv1.jpg')}
                  alt="Service 1"
                  style={{ width: '100%', borderRadius: '8px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.3 }}
                />
                <Typography variant="h5" className="service-title">
                  Dịch Vụ 1
                </Typography>
                <Typography variant="body2" className="service-description">
                  Mô tả ngắn gọn về dịch vụ 1.
                </Typography>
              </Box>
            </Grid>

          
            <Grid item xs={12} md={4}>
              <Box className="service-box">
                <motion.img
                  src={require('../assets/img/dv2.jpg')}
                  alt="Service 2"
                  style={{ width: '100%', borderRadius: '8px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.5 }}
                />
                <Typography variant="h5" className="service-title">
                  Dịch Vụ 2
                </Typography>
                <Typography variant="body2" className="service-description">
                  Mô tả ngắn gọn về dịch vụ 2.
                </Typography>
              </Box>
            </Grid>

      
            <Grid item xs={12} md={4}>
              <Box className="service-box">
                <motion.img
                  src={require('../assets/img/dv3.jpg')}
                  alt="Service 3"
                  style={{ width: '100%', borderRadius: '8px' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.7 }}
                />
                <Typography variant="h5" className="service-title">
                  Dịch Vụ 3
                </Typography>
                <Typography variant="body2" className="service-description">
                  Mô tả ngắn gọn về dịch vụ 3.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

    
      <Container maxWidth="lg" className="cta-section">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 3 }}
        >
          <Typography variant="h4" className="cta-title">
            Sẵn Sàng Đồng Hành Cùng Bạn
          </Typography>
          <Typography variant="body1" className="cta-description">
            Liên hệ ngay để được tư vấn và trải nghiệm các dịch vụ tốt nhất từ chúng tôi!
          </Typography>
          <Button variant="contained" color="secondary" className="cta-button">
            Liên Hệ Ngay
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutPage;
