import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  alpha
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

// FAQ data
const faqData = [
  {
    question: "How does SERA's AI personalize my learning experience?",
    answer: "SERA's advanced AI analyzes your progress, learning style, and strengths/weaknesses to create a customized learning path. It continuously adapts as you learn, focusing on areas that need improvement while ensuring you master all essential skills."
  },
  {
    question: "What kind of certificate will I receive after completing a path?",
    answer: "Upon completion, you'll receive an industry-recognized digital certificate that validates your skills. Each certificate includes a unique verification code and details of the competencies you've mastered, which you can share with potential employers or on professional platforms like LinkedIn."
  },
  {
    question: "How long does it take to complete the Front-End Development path?",
    answer: "The typical completion time is 3-6 months with 10-15 hours of weekly study. However, SERA's personalized approach means this varies based on your existing skills, learning pace, and time commitment. Some students complete it faster, while others take longer to ensure deep mastery."
  },
  {
    question: "Can I access the platform on mobile devices?",
    answer: "Yes, SERA is fully responsive and works on all modern devices. Our mobile app (available for iOS and Android) provides additional features for learning on the go, including offline content access and progress synchronization across devices."
  },
  {
    question: "Do you offer job placement services after completion?",
    answer: "While we don't directly place graduates in jobs, we provide extensive career resources including portfolio development guidance, interview preparation, and connections to our industry partners who frequently hire our graduates. Many students find employment within 3 months of completing their path."
  },
  {
    question: "What support is available if I get stuck on a concept?",
    answer: "SERA provides multiple support options: 24/7 AI tutor assistance, weekly live Q&A sessions with experienced instructors, active community forums where fellow learners and mentors can help, and optional 1-on-1 tutoring sessions (available as an add-on service)."
  }
];

const FAQSection: React.FC = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        zIndex: 5
      }}
    >
      <Container maxWidth="lg">
        {/* Section header */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 8,
            position: 'relative'
          }}
        >
          <QuestionAnswerIcon
            sx={{
              fontSize: 40,
              color: theme.palette.primary.main,
              mb: 2
            }}
          />
          <Typography
            variant="h3"
            component="h2"
            className="section-title"
            align="center"
            gutterBottom
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            align="center"
            sx={{
              maxWidth: '700px',
              fontSize: { xs: '1rem', md: '1.1rem' }
            }}
          >
            Get quick answers to the most common questions about SERA's learning platform
          </Typography>
          
          {/* Decorative elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -20,
              left: { xs: '5%', md: '15%' },
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: alpha(theme.palette.primary.main, 0.1),
              filter: 'blur(20px)',
              zIndex: -1
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -40,
              right: { xs: '5%', md: '10%' },
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: alpha(theme.palette.secondary.main, 0.1),
              filter: 'blur(25px)',
              zIndex: -1
            }}
          />
        </Box>

        {/* FAQ Items */}
        <Box sx={{ maxWidth: '900px', mx: 'auto' }}>
          {faqData.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                background: 'rgba(30, 30, 40, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px !important',
                mb: 2,
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.3s ease',
                boxShadow: expanded === `panel${index}` 
                  ? `0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                  : '0 5px 15px rgba(0,0,0,0.1)',
                '&:before': {
                  display: 'none'
                },
                '&:hover': {
                  boxShadow: `0 8px 25px rgba(0,0,0,0.15), 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`
                }
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon 
                    sx={{ 
                      color: theme.palette.primary.main,
                      transition: 'transform 0.3s',
                      transform: expanded === `panel${index}` ? 'rotate(180deg)' : 'rotate(0)'
                    }} 
                  />
                }
                aria-controls={`panel${index}d-content`}
                id={`panel${index}d-header`}
                sx={{
                  borderBottom: expanded === `panel${index}` ? `1px solid ${alpha(theme.palette.primary.main, 0.2)}` : 'none',
                  transition: 'all 0.3s ease',
                  '& .MuiAccordionSummary-content': {
                    transition: 'margin 0.3s ease',
                  }
                }}
              >
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    fontWeight: 600,
                    color: expanded === `panel${index}` ? theme.palette.primary.main : theme.palette.text.primary
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  background: alpha(theme.palette.primary.main, 0.03),
                  borderTop: 'none',
                  padding: 3
                }}
              >
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQSection; 