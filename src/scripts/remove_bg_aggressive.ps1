
param (
    [string]$InputPath,
    [string]$OutputPath
)

Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile($InputPath)
$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
$img.Dispose() # Release file lock

# Load image again into editable bitmap
$img = [System.Drawing.Bitmap]::FromFile($InputPath)

# Aggressive threshold to eat the black halo
$threshold = 80

for ($y = 0; $y -lt $img.Height; $y++) {
    for ($x = 0; $x -lt $img.Width; $x++) {
        $pixel = $img.GetPixel($x, $y)
        
        # Check if pixel is dark enough to be considered background
        if ($pixel.R -le $threshold -and $pixel.G -le $threshold -and $pixel.B -le $threshold) {
            $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        }
        else {
            $bmp.SetPixel($x, $y, $pixel)
        }
    }
}

$bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
$bmp.Dispose()

Write-Host "Background removed with aggressive threshold $threshold and saved to $OutputPath"
