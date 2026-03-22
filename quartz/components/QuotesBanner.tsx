import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import fs from "fs"
import path from "path"

const QuotesBanner: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {

  let quotes: string[] = []
  try {
    const filePath = path.join(process.cwd(), "content", "00-Meta", "quotes.md")
    const fileContent = fs.readFileSync(filePath, "utf-8")
    
    quotes = fileContent
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith("---") && !line.startsWith("#"))
      .map(line => line.replace(/^[-*]\s+/, "")) 
  } catch (e) {
    quotes = ["ERROR 404: QUOTES_NOT_FOUND_"]
  }

  if (quotes.length === 0) return null

  const initialQuote = quotes[Math.floor(Math.random() * quotes.length)]
  
  return (
    <div class={`quotes-banner ${displayClass ?? ""}`}>
      <span class="quotes-content" id="quotes-container" style={{ opacity: 0 }}>
        {initialQuote}
      </span>
      
      <script dangerouslySetInnerHTML={{ __html: `
        window.gardenQuotes = ${JSON.stringify(quotes)};
        document.addEventListener("nav", () => {
          const container = document.getElementById("quotes-container");
          if (container && window.gardenQuotes.length > 0) {
    
            const randomIdx = Math.floor(Math.random() * window.gardenQuotes.length);
            container.innerText = window.gardenQuotes[randomIdx];
            
            setTimeout(() => {
              container.style.opacity = '1';
            }, 50); 
          }
        });
      `}} />
    </div>
  )
}

export default (() => QuotesBanner) satisfies QuartzComponentConstructor