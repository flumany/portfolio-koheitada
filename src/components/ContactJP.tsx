
import React from 'react';

const ContactJP: React.FC = () => {
  return (
    <section id="contact" className="section bg-nordic-gray">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
            お問い合わせ
          </h2>
          <div className="w-16 h-1 bg-accent-blue mx-auto mb-8" />
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-nordic-white p-8 rounded-lg shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-4">お気軽にご連絡ください</h3>
                <p className="text-nordic-dark/70 mb-6">
                  新しい機会やコラボレーションに常に興味を持っています。
                  プロジェクトについて話し合いたい場合や、ご挨拶したい場合は、お気軽にご連絡ください。
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">メール</h4>
                  <a 
                    href="mailto:contact@example.com" 
                    className="text-accent-blue hover:underline"
                  >
                    contact@example.com
                  </a>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">LinkedIn</h4>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent-blue hover:underline"
                  >
                    LinkedIn プロフィール
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactJP;
