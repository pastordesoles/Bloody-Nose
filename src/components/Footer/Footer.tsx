import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const StickyFooter = (): JSX.Element => {
  return (
    <Box
      component="div"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#1f0505",
        color: "#d3d4d9",
      }}
      aria-label="author"
      role="contentinfo"
    >
      <Container
        maxWidth="sm"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <Typography variant="body1">Created and designed by XSB.</Typography>
      </Container>
    </Box>
  );
};

export default StickyFooter;
