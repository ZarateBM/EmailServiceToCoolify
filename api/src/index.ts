import app from './app';

const asciiArt = `
       ..--""|
       |     |
       | .---'
 (\-.--| |---------.
 / \\) \\ | |          \\
 |:.  | | |           |
 |:.  | |o|           |
 |:.  | \`"\`         |
 |:.  |_ __  __ _  __ /
 \`""""\`""|=\`|""""""""\`
         |=_|
         |= |
`;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\n`);
  console.log(`=================================`);
  console.log(`🚀 Servidor corriendo en modo: ${process.env.NODE_ENV || "desarrollo"}`);
  console.log(`🌐 URL de la API: http://localhost:${PORT}`);
  console.log(`📅 Fecha de inicio: ${new Date().toLocaleString()}`);
  console.log(`\n`);
  console.log(asciiArt);
  console.log(`\n`);
  console.log(`=================================`);
  
});
