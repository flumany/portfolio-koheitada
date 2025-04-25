
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">自己紹介</h2>
          <div className="w-16 h-1 bg-nordic-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              はじめまして、多田耕平と申します。フロントエンド開発とUI/UXデザインを専門とするWeb開発者です。
            </p>
            <p>
              JavaScriptフレームワーク（React, Vue.js）を用いたフロントエンド開発を中心に、
              使いやすく美しいWebアプリケーションの開発に取り組んでいます。
            </p>
            <p>
              ユーザー体験を最優先に考え、シンプルで直感的なインターフェースデザインを心がけています。
              また、アクセシビリティやパフォーマンスの最適化にも注力しています。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">フロントエンド開発</h3>
              <p className="text-sm text-nordic-dark/70">
                React, Vue.jsでの開発
              </p>
            </div>
            <div className="bg-nordic-blue p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">UI/UXデザイン</h3>
              <p className="text-sm text-nordic-dark/70">
                ユーザー中心設計
              </p>
            </div>
            <div className="bg-nordic-gray p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">バックエンド開発</h3>
              <p className="text-sm text-nordic-dark/70">
                Node.js, PHPでの開発
              </p>
            </div>
            <div className="bg-nordic-offwhite border border-nordic-gray/30 p-6 rounded-lg">
              <h3 className="font-poppins text-xl mb-2">データベース</h3>
              <p className="text-sm text-nordic-dark/70">
                MySQL, MongoDBの設計・運用
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
