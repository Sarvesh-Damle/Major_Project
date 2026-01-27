import { useState } from 'react';
import { IoShareSocial, IoLogoWhatsapp, IoLogoFacebook, IoLogoTwitter, IoLink, IoCheckmark } from 'react-icons/io5';

const ShareButtons = ({ title, text, url }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this property';
  const shareText = text || `${shareTitle} - Found on Buddies`;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    } else {
      setIsOpen(!isOpen);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: IoLogoWhatsapp,
      color: 'hover:bg-green-100 hover:text-green-600',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`,
    },
    {
      name: 'Facebook',
      icon: IoLogoFacebook,
      color: 'hover:bg-blue-100 hover:text-blue-600',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: IoLogoTwitter,
      color: 'hover:bg-sky-100 hover:text-sky-500',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <div className='relative inline-block'>
      <button
        onClick={handleNativeShare}
        className='flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
        aria-label='Share this property'
        aria-expanded={isOpen}
        aria-haspopup='menu'
      >
        <IoShareSocial size={20} />
        <span className='hidden sm:inline'>Share</span>
      </button>

      {isOpen && (
        <>
          <div className='fixed inset-0 z-40' onClick={() => setIsOpen(false)} aria-hidden='true' />
          <div
            className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50 py-2'
            role='menu'
            aria-label='Share options'
          >
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                className={`flex items-center gap-3 px-4 py-2 text-gray-700 transition-colors ${link.color}`}
                role='menuitem'
                onClick={() => setIsOpen(false)}
              >
                <link.icon size={20} />
                <span>{link.name}</span>
              </a>
            ))}
            <button
              onClick={() => {
                copyToClipboard();
              }}
              className='flex items-center gap-3 px-4 py-2 w-full text-left text-gray-700 hover:bg-gray-100 transition-colors'
              role='menuitem'
            >
              {copied ? <IoCheckmark size={20} className='text-green-600' /> : <IoLink size={20} />}
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButtons;
