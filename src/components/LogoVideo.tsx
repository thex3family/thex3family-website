import { Box, useColorModeValue } from "@chakra-ui/react"

const LogoVideo = () => {
  const src = "animated-logo.mp4"

  return (
    <Box>
      <video
        id="hero-video"
        width="100%"
        height="auto"
        src={src}
        playsInline
        autoPlay
        loop
        muted
      />
    </Box>
  )
}

export default LogoVideo
