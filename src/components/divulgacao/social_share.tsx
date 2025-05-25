'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2, Mail } from 'lucide-react';
// Assuming you have or can install specific brand icons (e.g., from react-icons)
// Example using placeholders if specific icons aren't readily available in lucide
// import { FaWhatsapp, FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaTelegramPlane, FaKuaishou } from 'react-icons/fa';

// Placeholder for affiliate link - should be fetched dynamically
const referralLink = 'http://short.up.bet.br/AAAABC';
const shareText = `Confira esta oportunidade incrível! ${referralLink}`;

// Social media platforms configuration
const socialPlatforms = [
  {
    name: 'WhatsApp',
    // icon: FaWhatsapp,
    icon: () => <span className="text-xl">📱</span>, // Placeholder icon
    shareUrl: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
    bgColor: 'bg-green-500 hover:bg-green-600',
  },
  {
    name: 'Facebook',
    // icon: FaFacebook,
    icon: () => <span className="text-xl">📘</span>, // Placeholder icon
    shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}&quote=${encodeURIComponent(shareText)}`,
    bgColor: 'bg-blue-600 hover:bg-blue-700',
  },
  {
    name: 'Instagram',
    // icon: FaInstagram,
    icon: () => <span className="text-xl">📸</span>, // Placeholder icon - Instagram sharing is complex, often requires mobile app
    shareUrl: '#',
    bgColor: 'bg-pink-500 hover:bg-pink-600',
    disabled: true, // Direct web sharing is limited
  },
  {
    name: 'TikTok',
    // icon: FaTiktok,
    icon: () => <span className="text-xl">🎵</span>, // Placeholder icon - TikTok sharing is complex
    shareUrl: '#',
    bgColor: 'bg-black hover:bg-gray-800',
    disabled: true, // Direct web sharing is limited
  },
  {
    name: 'X (Twitter)',
    // icon: FaTwitter,
    icon: () => <span className="text-xl">🐦</span>, // Placeholder icon
    shareUrl: `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`,
    bgColor: 'bg-gray-700 hover:bg-gray-800',
  },
  {
    name: 'Telegram',
    // icon: FaTelegramPlane,
    icon: () => <span className="text-xl">✈️</span>, // Placeholder icon
    shareUrl: `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`,
    bgColor: 'bg-sky-500 hover:bg-sky-600',
  },
  {
    name: 'Kwai',
    // icon: FaKuaishou,
    icon: () => <span className="text-xl">🎬</span>, // Placeholder icon - Kwai sharing might be complex
    shareUrl: '#',
    bgColor: 'bg-orange-500 hover:bg-orange-600',
    disabled: true, // Direct web sharing might be limited
  },
  {
    name: 'Email',
    icon: Mail,
    shareUrl: `mailto:?subject=Confira esta oportunidade!&body=${encodeURIComponent(shareText)}`,
    bgColor: 'bg-red-500 hover:bg-red-600',
  },
];

const SocialShare = () => {
  // Split platforms into two rows as requested
  const row1 = socialPlatforms.slice(0, 4);
  const row2 = socialPlatforms.slice(4);

  const openShareWindow = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <Share2 size={20} className="mr-2 text-primary" />
          Compartilhe nas Redes Sociais
        </CardTitle>
        <CardDescription className="text-text-secondary">Divulgue seu link de indicação facilmente.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {row1.map((platform) => (
            <Button
              key={platform.name}
              variant="default"
              className={`w-full ${platform.bgColor} text-white flex items-center justify-center space-x-2 ${platform.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !platform.disabled && openShareWindow(platform.shareUrl)}
              disabled={platform.disabled}
              title={platform.disabled ? `${platform.name} (Compartilhamento direto não suportado)` : `Compartilhar no ${platform.name}`}
            >
              <platform.icon size={18} />
              <span className="hidden sm:inline">{platform.name}</span>
            </Button>
          ))}
        </div>
        {/* Row 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {row2.map((platform) => (
            <Button
              key={platform.name}
              variant="default"
              className={`w-full ${platform.bgColor} text-white flex items-center justify-center space-x-2 ${platform.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !platform.disabled && openShareWindow(platform.shareUrl)}
              disabled={platform.disabled}
              title={platform.disabled ? `${platform.name} (Compartilhamento direto não suportado)` : `Compartilhar no ${platform.name}`}
            >
              <platform.icon size={18} />
              <span className="hidden sm:inline">{platform.name}</span>
            </Button>
          ))}
        </div>
        {/* Display note if any platform is disabled */}
        {socialPlatforms.some(p => p.disabled) && <p className="text-xs text-text-secondary text-center mt-2">Nota: Compartilhamento direto para Instagram, TikTok e Kwai pode exigir o uso do aplicativo móvel.</p>}
      </CardContent>
    </Card>
  );
};

export default SocialShare;

