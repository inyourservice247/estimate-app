# estimate-app
# Digital Estimate Builder

A modern, mobile-first web app for creating and downloading professional estimates instantly. Built for quick daily use with automatic calculations and no unnecessary complexity.

## ✨ Features

✅ **Mobile-First Design** - Optimized for phones, clean and minimal interface
✅ **Live Calculations** - Amount = Quantity × Rate, updates instantly as you type
✅ **Add Items Instantly** - Click "+ Add Item" to add rows, serial numbers auto-increment
✅ **Auto-Fill Date** - Today's date is pre-filled, but fully editable
✅ **Professional Fields** - Business Name, Customer Name, Date, and Item Details
✅ **Digital Download** - Export as high-quality JPEG with one click
✅ **No Refresh Required** - All calculations happen in real-time
✅ **Touch-Friendly** - Large inputs and buttons designed for fingers, not mice

## 🚀 Quick Start

### Option 1: Use Locally
1. Clone the repository
2. Open `index.html` in your web browser (any modern browser works)
3. Start creating estimates immediately

### Option 2: Deploy to GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select "Deploy from a branch" → choose `main` branch
4. Your app will be live at `https://yourusername.github.io/repo-name`

### Option 3: Deploy to Vercel/Netlify
1. Connect your GitHub repo
2. Deploy with one click
3. Get a live URL instantly

## 📱 How to Use

### Creating an Estimate

1. **Enter Business & Customer Info**
   - Type your business name (e.g., "ABC Services")
   - Enter customer name
   - Date auto-fills with today's date (edit if needed)

2. **Add Items to the Estimate**
   - First row is ready to use
   - Type item description in "Particular"
   - Enter quantity in "Qty"
   - Enter rate/price in "Rate"
   - Amount calculates automatically
   - Click "+ Add Item" to add more rows

3. **Watch the Total Update**
   - As you type quantities and rates, the total updates instantly
   - No buttons to click, no refresh needed

4. **Download as JPEG**
   - Click "Download as JPEG"
   - A clean, professional estimate image is generated
   - File is automatically saved to your downloads folder
   - Filename includes customer name and date

## 🎨 Design Philosophy

This app follows a **modern digital-first** approach:
- **No paper imitation** - Clean, minimal interface
- **Mobile-optimized** - Works perfectly on phones
- **Touch-friendly** - Large buttons and inputs
- **Fast interactions** - No waiting, no loading screens
- **Smart defaults** - Today's date, auto-incrementing serial numbers

## 📋 Table Columns Explained

| Column | Purpose |
|--------|---------|
| **S.No** | Serial number (auto-incremented) |
| **Particular** | Item description |
| **Qty** | Quantity of items |
| **Rate** | Price per item |
| **Amount** | Qty × Rate (auto-calculated) |

## 🔧 Technical Details

**Built with:**
- HTML5 (semantic markup)
- CSS3 (mobile-first, no CSS framework)
- Vanilla JavaScript (no dependencies, except html2canvas for image export)
- html2canvas library for JPEG generation

**Browser Support:**
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Mobile browsers (iOS Safari, Chrome Mobile, etc.)

## 📦 File Structure

```
estimate-app/
├── index.html      # Main HTML structure
├── styles.css      # All styling (mobile-first)
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🎯 Keyboard Shortcuts

- **Tab from Rate field** → Auto-adds a new row when you tab out of the last item
- **Enter in any field** → Continues to next input
- **Focus management** → When adding an item, cursor auto-focuses on Particular field

## 🖼️ Download Output

The generated JPEG includes:
- Business name and "ESTIMATE" header
- Customer name and date
- Clean, professional table with all items
- Subtotal and total amount
- Professional styling (not a scanned paper)

**Image specs:**
- Format: JPEG (.jpg)
- Resolution: High quality (optimized for email/sharing)
- Filename: `Estimate_[CustomerName]_[Date].jpg`

## 🚫 Common Issues & Solutions

### Image not downloading?
- Check browser console for errors
- Ensure pop-ups aren't blocked
- Try a different browser

### Estimates look pixelated?
- This is normal on very large screens
- Designed for mobile/sharing, not printing
- Download quality is optimized for email/WhatsApp

### Date won't change?
- Click the date input field
- Use date picker (click calendar icon) or type directly
- Format: YYYY-MM-DD

## 💡 Tips for Best Results

1. **Mobile First** - Use on your phone for the best experience
2. **Quick Entry** - Use Tab key to jump between fields
3. **Add Multiple Items** - Click "+ Add Item" as many times as needed
4. **Download Frequently** - Save estimates after each change
5. **Share Easily** - Downloaded JPEG works in email, WhatsApp, Telegram

## 📝 Customization

Want to modify colors or styling?
- Edit colors in `styles.css` under `:root` CSS variables
- Adjust layout by editing the `<div>` structure in `index.html`
- Modify calculations in `script.js` (search for `calculateRowAmount()`)

## 🐛 Bug Reports

Found an issue? 
- Check that you're using a modern browser
- Clear browser cache (Ctrl+Shift+Delete)
- Try in a different browser
- Check console for error messages (F12 → Console tab)

## 📄 License

Use freely for personal and commercial projects.

## 🎓 Learning Notes

This project demonstrates:
- Mobile-first CSS design
- Event delegation in JavaScript
- Real-time form calculations
- HTML5 Canvas image export
- Responsive table design
- Vanilla JS (no frameworks)

---

**Happy estimating!** 🚀
