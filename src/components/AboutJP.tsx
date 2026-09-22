
import React from 'react';

const AboutJP: React.FC = () => {
  return (
    <section id="about" className="section bg-nordic-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-accent-blue mx-auto mb-8" />
        </div>

        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-2 space-y-10">
            <div>
              <p className="text-lg md:text-xl font-normal text-nordic-dark mb-1">
                建築学を学んだ後、主にインテリアメーカーで開発や企画、品質管理などの幅広い経験を積みました。
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-normal text-nordic-dark mb-1">
                その中で得た3D技術やその他デジタルアプリケーションの知見を活かし、3DデザインやXR開発、AIサービス開発におけるUI/UXデザイン等に携わってきました。
              </p>
            </div>
            <div>
              <p className="text-lg md:text-xl font-normal text-nordic-dark mb-1">
                現在は、デジタルアプリケーション領域で培った知見と、新しい技術を素早く習得してきた経験を活かし、ユーザー視点に立ったUXデザインの考え方を取り入れながらDX推進を行っております。
              </p>
            </div>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 gap-4">
            <div className="bg-nordic-beige p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-2">R&D</h3>
              <p className="text-sm text-nordic-dark/70">技術調査・競合比較・海外サンドボックス検証・PoC・生成AI/先端ツール検証・工法開発・新材料開拓・3Dプリンタ試作・試験評価/データ蓄積・人体/感性データ解析・産学連携</p>
            </div>
            <div className="bg-nordic-gray p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-2">DX</h3>
              <p className="text-sm text-nordic-dark/70">課題抽出・業務分析・導入・定着・社内展開・AIエージェント構築・業務用システム構築・データビジュアライゼーション・人材育成</p>
            </div>
            <div className="bg-nordic-gray p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-2">3Dデザイン</h3>
              <p className="text-sm text-nordic-dark/70">プロダクト・空間・メタバース・デジタルツイン・キャラクターデザイン</p>
            </div>
            <div className="bg-nordic-beige p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-2">XR開発</h3>
              <p className="text-sm text-nordic-dark/70">VR・AR・MR</p>
            </div>
            <div className="col-span-2 bg-nordic-offwhite border border-nordic-gray/30 p-5 rounded-lg">
              <h3 className="font-medium text-xl mb-2">UXデザイン</h3>
              <p className="text-sm text-nordic-dark/70">ユーザー中心設計・人間中心設計・デザイン思考・UIデザイン（画面・コンポーネント・デザインシステム・バイブコーディング）・アジャイル</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutJP;
