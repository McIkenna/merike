import { Box, Typography, Collapse, Paper } from '@mui/material';
import Slider from 'react-slick';




const Banner = (props) => {
  const { bannerItems } = props
  // const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate animation duration based on text length
  // const calculateAnimationDuration = (text) => {
  //   if (!text) return 10;

  //   const textLength = text.length;
  //   const duration = Math.max(5, Math.min(50, 10 + (textLength) * 0.1));

  //   return duration;
  // };

  // useEffect(() => {
  //   if (!bannerItems || bannerItems.length === 0) return;

  //   const currentItem = bannerItems[currentIndex];
  //   const fullText = `(${currentItem?.name}) - ${currentItem?.description}`;
  //   const animationDuration = calculateAnimationDuration(fullText);

  //   // Move to next item after animation completes
  //   const timer = setTimeout(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerItems.length);
  //   }, animationDuration * 1000);

  //   return () => clearTimeout(timer);
  // }, [currentIndex, bannerItems]);

  // if (!bannerItems || bannerItems.length === 0) {
  //   return null;
  // }

  // const currentItem = bannerItems[currentIndex];
  // const fullText = `(${currentItem?.name}) - ${currentItem?.description}`;
  // const animationDuration = calculateAnimationDuration(fullText);

  return (
    <Box>
      <Collapse in={true}>
        <Box sx={{ position: 'relative', width: '100%' }}>

          <Slider
            // index={activeStep}
            autoplay={true}
            // navButtonsAlwaysInvisible={false}
            dots={false}
            infinite={true}
            speed={5000}
            slidesToShow={1}
            slidesToScroll={1}
            autoplaySpeed={10000}
            cssEase={"linear"}>
            {bannerItems?.map((currentItem) => (<Paper
              elevation={0}
              sx={{
                padding: '16px',
                marginTop: '0',
                backgroundColor: 'success.light',
                display: 'flex',
                position: 'relative',
                borderRadius: '0px',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'text.primary',
                overflow: 'hidden',
                border: 'none'

              }}
            >

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  overflow: 'hidden',
                  width: '100%',
                  border: 'none'
                }}
              >
                <Box sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1, padding: "5px", cursor: 'pointer'}}
                             >
                
                  <img src={currentItem?.image?.url} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    fontWeight: 500,
                    paddingRight: 2
                  }}
                >
                  {currentItem?.name}
                </Typography>
                <Typography
                  variant="h7"
                  sx={{
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    fontWeight: 500,
                    paddingLeft: 2
                  }}
                >
                  {currentItem?.description}
                </Typography>
              </Box>
            </Paper>)
            )}
          </Slider>
        </Box>
      </Collapse>
    </Box>
  );
};

export default Banner;