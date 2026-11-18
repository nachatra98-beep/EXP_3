New-Item -ItemType Directory -Force -Path "frontend/public" | Out-Null
$src = "C:\Users\user\.gemini\antigravity\brain\9c75d47c-a336-4d9e-88ae-0275d5926fcf\.user_uploaded\media_1794967339971_5e7e68e7.jpg"
Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Bitmap]::FromFile($src)
$w = $img.Width
$h = $img.Height
Write-Host "Image dimensions: $w x $h"

# The image is a side-by-side composite:
# Left half is the main website (width ~ w/2)
# Right half is the chatbot screen (width ~ w/2)

# Helper function to crop and save
function Crop-Image($x, $y, $width, $height, $outName) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $width, $height)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $cropped.Save("frontend/public/$outName", [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Saved: $outName ($width x $height)"
}

# Left screen: roughly 0 to w/2
# Right screen: roughly w/2 to w

# Let's crop:
# 1. Whole Left Screen: website preview
Crop-Image 0 0 ([int]($w * 0.536)) $h "cit-website-full.png"

# 2. Whole Right Screen: chatbot screen
Crop-Image ([int]($w * 0.54)) 0 ([int]($w * 0.46)) $h "cit-chatbot-full.png"

# 3. College Building: On left screen, around middle-right of hero section
# x: ~22% to 53%, y: ~11% to 43%
Crop-Image ([int]($w * 0.22)) ([int]($h * 0.115)) ([int]($w * 0.31)) ([int]($h * 0.315)) "campus-building.png"

# 4. Students photo ("Join Our Community"):
# On left screen, bottom-left of community card: x: ~2% to 24%, y: ~71% to 84%
Crop-Image ([int]($w * 0.018)) ([int]($h * 0.710)) ([int]($w * 0.230)) ([int]($h * 0.130)) "students-community.png"

# 5. Books and graduation cap illustration ("Our Programs"):
# On left screen, bottom-right of programs section: x: ~37% to 52%, y: ~56% to 71%
Crop-Image ([int]($w * 0.365)) ([int]($h * 0.560)) ([int]($w * 0.165)) ([int]($h * 0.150)) "programs-illustration.png"

# 6. Robot mascot from the right screen:
# x: ~60% to 80%, y: ~18% to 45%
Crop-Image ([int]($w * 0.605)) ([int]($h * 0.180)) ([int]($w * 0.190)) ([int]($h * 0.270)) "robot-mascot.png"

# 7. Robot mascot with speech bubble:
Crop-Image ([int]($w * 0.595)) ([int]($h * 0.180)) ([int]($w * 0.380)) ([int]($h * 0.270)) "robot-with-bubble.png"

# 8. Logo & Crest: Top-left of left screen
Crop-Image ([int]($w * 0.015)) ([int]($h * 0.015)) ([int]($w * 0.180)) ([int]($h * 0.070)) "cit-logo-crest.png"

$img.Dispose()
Write-Host "All assets extracted successfully!"
