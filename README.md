# Pen Serey Otdom Portfolio

A dependency-free static portfolio for Backend, Python, and Django REST Framework roles.

## Preview locally

From this directory, run:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser.

## Deploy to GitHub Pages

1. Create a new repository and upload the contents of this `dist` directory to its root.
2. In the repository settings, open **Pages**.
3. Select **Deploy from a branch**, choose the `main` branch, and save.
4. The portfolio will be available at the URL shown in the Pages settings.

## Deploy to Vercel

1. Create a new Vercel project and import the repository containing this directory.
2. Set the project root directory to `dist` if the repository includes the parent folder.
3. Leave the build command empty and deploy as a static site.

## Update the CV

Replace `assets/PenSereyOtdom.pdf` with a newer file using the same name. The visible download links will continue to work.
