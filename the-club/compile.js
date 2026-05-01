const { Compiler } = require("inkjs/compiler/Compiler");
const fs = require("fs");

const FILES = [
  { src: "./src/intro.ink",        out: "./intro.json"  },
  { src: "./src/the_club_ep1.ink", out: "./story.json"  },
];

let hasError = false;

for (const { src, out } of FILES) {
  const label = src.replace("./src/", "");
  console.log(`⚙️  Compilation de ${label}...`);
  try {
    const inkSource = fs.readFileSync(src, "utf8");
    const compiler = new Compiler(inkSource);
    const story = compiler.Compile();
    const json = story.ToJson();
    fs.writeFileSync(out, json, "utf8");
    console.log(`✅ ${out} généré avec succès !`);
  } catch (err) {
    console.error(`❌ Erreur dans ${label} :`, err.message);
    hasError = true;
  }
}

if (hasError) process.exit(1);
