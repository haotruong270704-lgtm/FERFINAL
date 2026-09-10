import React, { useEffect } from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import '../assets/css/HomePage.css'; 


const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out' });
  }, []);
  return (
    <div>
     

 
      <Box className="banner">
        <Typography variant="h2" className="title">Dịch Vụ Làm Nails Chuyên Nghiệp</Typography>
        <Typography variant="h5" className="description">Đặt lịch ngay để trải nghiệm dịch vụ đẳng cấp tại nhà hoặc tiệm.</Typography>
        <Button variant="contained" color="secondary" size="large">Đặt lịch ngay</Button>
      </Box>

      <Box className="blog-section">
        <Typography variant="h4" className="section-title" data-aos="fade-up">BLOG PINK</Typography>
        <Grid container spacing={4} sx={{ textAlign: 'center' }} data-aos="fade-up">
          <Grid item xs={12} sm={4}>
            <Box className="blog-card">
            <img src={require('../assets/img/gift.jpg')} alt="Qua tang khuyen mai" />
              <Typography variant="h6" className="card-title">TẢI APP NGAY – “SAY” VOUCHER</Typography>
              <Typography variant="body2" className="card-description">Chương trình khuyến mãi đặc biệt.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="blog-card">
            <img src={require('../assets/img/son.jpg')} alt="Mau son mong thuần chay" />
              <Typography variant="h6" className="card-title">SƠN MÓNG THUẦN CHAY – NHẬN NGAY DEAL HOT</Typography>
              <Typography variant="body2" className="card-description">Khám phá dịch vụ mới tại Pink Nails.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="blog-card">
            <img src={require('../assets/img/checkin.jpg')} alt="Check-in tai cua hang" />
              <Typography variant="h6" className="card-title">VUI CHECK-IN RINH NAIL XIN</Typography>
              <Typography variant="body2" className="card-description">Chiết khấu 15% khi check-in tại tiệm.</Typography>
            </Box>
          </Grid>
        </Grid>

        
        <Box className="see-more-button">
          <Button variant="contained" className="button">Xem Thêm</Button>
        </Box>
      </Box>

      
      

      
      <Box className="nailroom-introduction">
        <Grid container alignItems="center" justifyContent="center" spacing={4}>
          <Grid item xs={12} sm={6}>
          <img src={require('../assets/img/slogan.jpg')} alt="NailRoom" className="nailroom-image" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4" className="nailroom-title">VỚI Pink Beauty Hub</Typography>
            <Typography variant="h5" className="nailroom-subtitle">"AI CŨNG CÓ THỂ TRỞ NÊN ĐẸP HƠN"</Typography>
            <Typography variant="body1" className="nailroom-description">
              Xuất phát là một hệ thống Nail tại Đà Nẵng, Pink Beauty Hub luôn đặt trọn vẹn trái tim & tâm huyết vào việc làm đẹp cho các nàng.
            </Typography>
            <Typography variant="body1" className="nailroom-description">
              Bởi thế, slogan của Pink là “Ai cũng có thể trở nên đẹp hơn”. Đến với Pink và ra về như những phụ nữ xinh đẹp hơn, hạnh phúc hơn là điều chúng mình hướng tới.
            </Typography>
            <Button className="button" sx={{ marginRight: '20px' }}>Giới Thiệu</Button>
            <Button className="button">Hệ Thống Pink Beauty Hub</Button>
          </Grid>
        </Grid>
      </Box>

      <Box className="achievements-section">
        <Typography variant="h4" className="section-title" data-aos="fade-up">THÀNH TỰU VÀ CÁC LỢI ÍCH</Typography>
        <Grid container spacing={4} sx={{ textAlign: 'center' }} data-aos="fade-up">
          <Grid item xs={12} sm={4}>
            <Box className="achievement-card">
              <Typography variant="h6" className="card-title">Liên Kết Với Đối Tác Tốt</Typography>
              <Typography variant="body2" className="card-description">Chúng tôi hợp tác với các đối tác uy tín, giúp cung cấp dịch vụ và sản phẩm chất lượng cao nhất.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="achievement-card">
              <Typography variant="h6" className="card-title">Điều Khoản Minh Bạch</Typography>
              <Typography variant="body2" className="card-description">Chúng tôi cam kết về các điều khoản minh bạch và rõ ràng cho tất cả khách hàng.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box className="achievement-card">
              <Typography variant="h6" className="card-title">Chính Sách Bảo Hành</Typography>
              <Typography variant="body2" className="card-description">Chúng tôi cung cấp chính sách bảo hành dịch vụ để đảm bảo sự hài lòng của khách hàng.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      
    </div>
  );
};

export default HomePage;
