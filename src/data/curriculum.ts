import { Chapter, TheoryCard, ChapterExamData, PeriodicElement, ElectrochemicalRow } from '../types';

export const CURRICULUM: Record<number, Chapter[]> = {
  10: [
    { id: '10_1', num: 1, grade: 10, title: 'Cấu tạo nguyên tử', desc: 'Thành phần nguyên tử, hạt nhân, vỏ nguyên tử, orbital nguyên tử (AO) và cấu hình electron.' },
    { id: '10_2', num: 2, grade: 10, title: 'Bảng tuần hoàn các nguyên tố hoá học & Định luật tuần hoàn', desc: 'Cấu tạo bảng tuần hoàn, xu hướng biến thiên tính kim loại, phi kim, bán kính và độ âm điện.' },
    { id: '10_3', num: 3, grade: 10, title: 'Liên kết hoá học', desc: 'Quy tắc octet, liên kết ion, liên kết cộng hóa trị, liên kết hydrogen và tương tác van der Waals.' },
    { id: '10_4', num: 4, grade: 10, title: 'Phản ứng oxi hoá - khử', desc: 'Số oxi hóa, chất khử, chất oxi hóa, cân bằng phản ứng oxi hóa - khử theo phương pháp thăng bằng electron.' },
    { id: '10_5', num: 5, grade: 10, title: 'Năng lượng hoá học', desc: 'Phản ứng tỏa nhiệt, thu nhiệt, biến thiên enthalpy chuẩn (ΔrH°₂₉₈) và enthalpy tạo thành chuẩn (ΔfH°₂₉₈).' },
    { id: '10_6', num: 6, grade: 10, title: 'Tốc độ phản ứng', desc: 'Khái niệm tốc độ phản ứng, các yếu tố ảnh hưởng (nồng độ, nhiệt độ, áp suất, diện tích tiếp xúc, xúc tác).' },
    { id: '10_7', num: 7, grade: 10, title: 'Nguyên tố nhóm halogen', desc: 'Đơn chất halogen (F₂, Cl₂, Br₂, I₂), hydrogen halide, hydrohalic acid và muối halide.' }
  ],
  11: [
    { id: '11_1', num: 1, grade: 11, title: 'Cân bằng hoá học', desc: 'Khái niệm thuận nghịch, cân bằng hóa học, hằng số Kc, nguyên lý Le Chatelier, pH dung dịch.' },
    { id: '11_2', num: 2, grade: 11, title: 'Nitrogen - Sulfur', desc: 'Đơn chất nitrogen, ammonia (NH₃), muối ammonium, nitric acid (HNO₃), sulfur, sulfur dioxide (SO₂), sulfuric acid (H₂SO₄).' },
    { id: '11_3', num: 3, grade: 11, title: 'Đại cương về hoá học hữu cơ', desc: 'Hợp chất hữu cơ, nhóm chức, phổ hồng ngoại (IR), công thức phân tử, đồng phân và danh pháp.' },
    { id: '11_4', num: 4, grade: 11, title: 'Hydrocarbon', desc: 'Alkane, alkene, alkyne và arene (benzene). Cấu trúc, tính chất hóa học và ứng dụng làm nhiên liệu.' },
    { id: '11_5', num: 5, grade: 11, title: 'Dẫn xuất halogen - Alcohol - Phenol', desc: 'Cấu tạo, liên kết hydrogen, phản ứng thế, phản ứng tách và phản ứng đặc trưng của phenol với bromine.' },
    { id: '11_6', num: 6, grade: 11, title: 'Hợp chất carbonyl - Carboxylic acid', desc: 'Aldehyde, ketone, carboxylic acid. Phản ứng tráng bạc, tạo iodoform và phản ứng ester hóa.' }
  ],
  12: [
    { id: '12_1', num: 1, grade: 12, title: 'Ester - Lipid', desc: 'Khái niệm, cấu trúc ester, phản ứng xà phòng hóa, chất béo, acid béo omega-3, omega-6 và xà phòng/chất giặt rửa.' },
    { id: '12_2', num: 2, grade: 12, title: 'Carbohydrate', desc: 'Glucose, fructose, saccharose, maltose, tinh bột và cellulose. Cấu trúc mạch vòng, phản ứng thủy phân và tráng gương.' },
    { id: '12_3', num: 3, grade: 12, title: 'Hợp chất chứa nitrogen', desc: 'Amine, amino acid, peptide và protein. Tính base, điểm đẳng điện, liên kết peptide và phản ứng màu biuret.' },
    { id: '12_4', num: 4, grade: 12, title: 'Polymer', desc: 'Phản ứng trùng hợp, trùng ngưng. Nhựa nhiệt dẻo (PE, PVC), cao su (isoprene, buna), tơ nhân tạo và tơ tổng hợp.' },
    { id: '12_5', num: 5, grade: 12, title: 'Pin điện và điện phân', desc: 'Cặp oxi hóa - khử, pin Galvani, thế điện cực chuẩn E°, bình điện phân, mạ điện và bảo vệ kim loại.' },
    { id: '12_6', num: 6, grade: 12, title: 'Đại cương về kim loại', desc: 'Liên kết kim loại, tính dẻo, dẫn điện, dẫn nhiệt, tính khử kim loại, ăn mòn hóa học và ăn mòn điện hóa.' },
    { id: '12_7', num: 7, grade: 12, title: 'Nguyên tố nhóm IA và nhóm IIA', desc: 'Kim loại kiềm (Na, K), kiềm thổ (Ca, Ba, Mg), thạch cao, nước cứng và các phương pháp làm mềm nước cứng.' },
    { id: '12_8', num: 8, grade: 12, title: 'Sơ lược về dãy kim loại chuyển tiếp thứ nhất và phức chất', desc: 'Cấu hình electron phân lớp 3d, phức chất, phối tử, số phối trí và ứng dụng xúc tác.' }
  ]
};

export const CHAPTER_THEORY_DATA: Record<string, TheoryCard[]> = {
  '12_1': [
    {
      badge: 'Khái niệm & Cấu trúc',
      title: '1. Cấu Tạo & Danh Pháp Ester',
      content: `Khi thay thế nhóm -OH ở nhóm carboxyl của carboxylic acid bằng nhóm -OR' thì thu được ester. Công thức chung no, đơn chức, mạch hở: <span class="chem-code">C<span class="sub">n</span>H<span class="sub">2n</span>O<span class="sub">2</span> (n ≥ 2)</span>.<br>• Tên gọi: <em>Tên gốc hydrocarbon R' + Tên gốc acid (đuôi ate)</em>.<br>• Ví dụ: <span class="chem-code">CH<span class="sub">3</span>COOC<span class="sub">2</span>H<span class="sub">5</span></span> (ethyl acetate), <span class="chem-code">HCOOCH<span class="sub">3</span></span> (methyl formate).`
    },
    {
      badge: 'Tính chất hóa học',
      title: '2. Phản Ứng Thủy Phân & Xà Phòng Hóa',
      content: `<strong>Môi trường acid (thuận nghịch):</strong><br><span class="chem-code">RCOOR' + H<span class="sub">2</span>O ⇌ RCOOH + R'OH</span> (xúc tác H<span class="sub">2</span>SO<span class="sub">4</span> đặc, t°).<br><strong>Môi trường kiềm (một chiều - phản ứng xà phòng hóa):</strong><br><span class="chem-code">RCOOR' + NaOH → RCOONa + R'OH</span> (đun nóng).<br><strong>Ester của phenol:</strong><br><span class="chem-code">RCOOC<span class="sub">6</span>H<span class="sub">5</span> + 2NaOH → RCOONa + C<span class="sub">6</span>H<span class="sub">5</span>ONa + H<span class="sub">2</span>O</span>.`
    },
    {
      badge: 'Chất béo (Lipid)',
      title: '3. Triglyceride & Acid Béo Thiết Yếu',
      content: `Chất béo là triester của glycerol với các acid béo (triglyceride): <span class="chem-code">(RCOO)<span class="sub">3</span>C<span class="sub">3</span>H<span class="sub">5</span></span>.<br>• Acid béo no thường gặp: Palmitic acid (<span class="chem-code">C<span class="sub">15</span>H<span class="sub">31</span>COOH</span>, M=256), Stearic acid (<span class="chem-code">C<span class="sub">17</span>H<span class="sub">35</span>COOH</span>, M=284) → Chất béo rắn (mỡ động vật).<br>• Acid béo không no: Oleic acid (<span class="chem-code">C<span class="sub">17</span>H<span class="sub">33</span>COOH</span>), Linoleic acid (<span class="chem-code">C<span class="sub">17</span>H<span class="sub">31</span>COOH</span>) → Chất béo lỏng (dầu thực vật).`
    },
    {
      badge: 'Ứng dụng thực tiễn',
      title: '4. Ứng Dụng & Xà Phòng Sinh Học',
      content: `• Ester có mùi thơm hoa quả (isoamyl acetate: mùi chuối chín; benzyl acetate: mùi hoa nhài; ethyl butyrate: mùi dứa), dùng làm hương liệu mỹ phẩm và dung môi pha sơn.<br>• Chất béo cung cấp năng lượng quan trọng cho cơ thể (9 kcal/g), là dung môi hòa tan vitamin A, D, E, K. Đun chất béo với NaOH tạo muối carboxylate dùng làm xà phòng.`
    }
  ],
  '12_2': [
    {
      badge: 'Phân loại',
      title: '1. Đại Cương Carbohydrate',
      content: `Carbohydrate là hợp chất hữu cơ tạp chức, thường có công thức chung <span class="chem-code">C<span class="sub">n</span>(H<span class="sub">2</span>O)<span class="sub">m</span></span>.<br>• Monosaccharide: Glucose, Fructose (<span class="chem-code">C<span class="sub">6</span>H<span class="sub">12</span>O<span class="sub">6</span></span>).<br>• Disaccharide: Saccharose, Maltose (<span class="chem-code">C<span class="sub">12</span>H<span class="sub">22</span>O<span class="sub">11</span></span>).<br>• Polysaccharide: Tinh bột, Cellulose (<span class="chem-code">(C<span class="sub">6</span>H<span class="sub">10</span>O<span class="sub">5</span>)<span class="sub">n</span></span>).`
    },
    {
      badge: 'Phản ứng đặc trưng',
      title: '2. Tính Chất Glucose & Fructose',
      content: `Glucose tráng bạc: <span class="chem-code">C<span class="sub">6</span>H<span class="sub">12</span>O<span class="sub">6</span> + 2[Ag(NH<span class="sub">3</span>)<span class="sub">2</span>]OH → C<span class="sub">6</span>H<span class="sub">11</span>O<span class="sub">7</span>NH<span class="sub">4</span> + 2Ag↓ + 3NH<span class="sub">3</span> + H<span class="sub">2</span>O</span>.<br>Khử màu nước bromine (Fructose không làm mất màu nước Br₂ trong môi trường acid). Hòa tan Cu(OH)₂ ở nhiệt độ thường tạo phức màu xanh lam thẩm mỹ.`
    }
  ]
};

export const DEFAULT_EXAM_BANK: Record<string, ChapterExamData> = {
  '12_1': {
    part1: [
      { q: 'Ester ethyl acetate có công thức phân tử là', opts: ['C₂H₄O₂', 'C₃H₆O₂', 'C₄H₈O₂', 'C₄H₆O₂'], ans: 2, level: 'Biết', exp: 'Ethyl acetate là CH₃COOC₂H₅ có công thức phân tử là C₄H₈O₂ (M = 88).' },
      { q: 'Chất béo là triester của carboxylic acid béo với alcohol nào sau đây?', opts: ['Ethanol', 'Ethylene glycol', 'Methanol', 'Glycerol'], ans: 3, level: 'Biết', exp: 'Theo định nghĩa SGK, chất béo là triester của glycerol với các acid béo.' },
      { q: 'Thủy phân tristearin trong dung dịch NaOH đun nóng thu được muối có công thức là', opts: ['C₁₇H₃₅COONa', 'C₁₇H₃₃COONa', 'C₁₅H₃₁COONa', 'CH₃COONa'], ans: 0, level: 'Biết', exp: 'Tristearin là (C₁₇H₃₅COO)₃C₃H₅, phản ứng xà phòng hóa sinh ra sodium stearate C₁₇H₃₅COONa.' },
      { q: 'Ester nào sau đây có mùi thơm chuối chín đặc trưng?', opts: ['Ethyl formate', 'Isoamyl acetate', 'Benzyl acetate', 'Geranyl acetate'], ans: 1, level: 'Biết', exp: 'Isoamyl acetate có mùi chuối chín; Benzyl acetate có mùi hoa nhài; Ethyl butyrate có mùi dứa.' },
      { q: 'Chất nào sau đây là acid béo không no có trong dầu thực vật?', opts: ['Palmitic acid', 'Stearic acid', 'Oleic acid', 'Acetic acid'], ans: 2, level: 'Biết', exp: 'Oleic acid có công thức C₁₇H₃₃COOH chứa 1 liên kết đôi C=C dạng cis trong phân tử.' },
      { q: 'Công thức chung của ester no, đơn chức, mạch hở là', opts: ['CnH₂nO (n ≥ 1)', 'CnH₂nO₂ (n ≥ 2)', 'CnH₂n₋₂O₂ (n ≥ 3)', 'CnH₂n₊₂O₂ (n ≥ 2)'], ans: 1, level: 'Biết', exp: 'Ester no, đơn chức, mạch hở có công thức chung là CnH₂nO₂ với n ≥ 2.' },
      { q: 'Phản ứng xà phòng hóa ester trong môi trường kiềm thuộc loại phản ứng', opts: ['Thuận nghịch', 'Một chiều', 'Trùng ngưng', 'Tự oxi hóa'], ans: 1, level: 'Biết', exp: 'Thủy phân ester trong dung dịch kiềm đun nóng là phản ứng một chiều (xà phòng hóa).' },
      { q: 'Xà phòng hóa hoàn toàn methyl formate bằng dung dịch KOH thu được sản phẩm gồm', opts: ['HCOOK và CH₃OH', 'CH₃COOK và H₂O', 'HCOOH và CH₃OK', 'CH₃COOK và CH₃OH'], ans: 0, level: 'Hiểu', exp: 'Phương trình: HCOOCH₃ + KOH → HCOOK + CH₃OH.' },
      { q: 'Số đồng phân ester ứng với công thức phân tử C₃H₆O₂ là', opts: ['1', '2', '3', '4'], ans: 1, level: 'Hiểu', exp: 'Có 2 đồng phân ester: HCOOC₂H₅ (ethyl formate) và CH₃COOCH₃ (methyl acetate).' },
      { q: 'Cho 8,8 gam ethyl acetate tác dụng hoàn toàn với dung dịch NaOH dư. Khối lượng muối CH₃COONa thu được là', opts: ['4,1 gam', '8,2 gam', '6,8 gam', '10,2 gam'], ans: 1, level: 'Vận dụng', exp: 'n(CH₃COOC₂H₅) = 8,8 / 88 = 0,1 mol → n(CH₃COONa) = 0,1 mol → m = 0,1 × 82 = 8,2 gam.' },
      { q: 'Chất béo lỏng dễ bị ôi thiu khi để lâu ngoài không khí là do nguyên nhân nào?', opts: ['Phản ứng thủy phân bởi hơi nước', 'Gốc acid béo không no bị oxi hóa chậm bởi oxygen', 'Vi khuẩn phân hủy glycerol', 'Ester hóa ngược'], ans: 1, level: 'Hiểu', exp: 'Gốc acid béo không no có liên kết đôi C=C dễ bị oxygen không khí oxi hóa chậm tạo peroxide, sau đó phân hủy thành aldehyde có mùi khó chịu (hiện tượng ôi thiu).' },
      { q: 'Để chuyển hóa chất béo lỏng thành chất béo rắn (sản xuất bơ nhân tạo), người ta dùng phản ứng', opts: ['Xà phòng hóa', 'Hydrogen hóa', 'Thủy phân', 'Oxi hóa'], ans: 1, level: 'Hiểu', exp: 'Phản ứng cộng H₂ (xúc tác Ni, t°) chuyển gốc acid béo không no thành no (dầu lỏng thành mỡ rắn).' },
      { q: 'Đun nóng ester phenyl acetate với dung dịch NaOH dư, tỉ lệ mol ester : NaOH phản ứng là', opts: ['1 : 1', '1 : 2', '1 : 3', '2 : 1'], ans: 1, level: 'Hiểu', exp: 'CH₃COOC₆H₅ + 2NaOH → CH₃COONa + C₆H₅ONa + H₂O do sinh ra phenol phản ứng tiếp với NaOH.' },
      { q: 'Ester X được tạo bởi methyl alcohol và acetic acid. Công thức của X là', opts: ['HCOOCH₃', 'CH₃COOCH₃', 'CH₃COOC₂H₅', 'C₂H₅COOCH₃'], ans: 1, level: 'Biết', exp: 'Methyl acetate có công thức là CH₃COOCH₃.' },
      { q: 'Phát biểu nào sau đây về lipid là KHÔNG đúng?', opts: ['Lipid không tan trong nước', 'Chất béo nhẹ hơn nước', 'Mỡ động vật chứa chủ yếu các acid béo không no', 'Dầu thực vật chứa nhiều acid béo không no'], ans: 2, level: 'Hiểu', exp: 'Mỡ động vật chứa chủ yếu các gốc acid béo no (như stearic, palmitic) nên ở thể rắn ở nhiệt độ phòng.' },
      { q: 'Hợp chất nào sau đây phản ứng với dung dịch NaOH sinh ra glycerol?', opts: ['Ethyl acetate', 'Triolein', 'Benzyl alcohol', 'Saccharose'], ans: 1, level: 'Biết', exp: 'Triolein là chất béo, khi thủy phân trong NaOH sinh ra glycerol và muối sodium oleate.' },
      { q: 'Ester có công thức phân tử C₄H₈O₂ khi thủy phân trong môi trường acid thu được alcohol bậc 1. Số đồng phân cấu tạo thỏa mãn là', opts: ['2', '3', '4', '1'], ans: 1, level: 'Vận dụng', exp: 'Gồm: HCOOCH₂CH₂CH₃, HCOOCH₂CH(CH₃)₂, CH₃COOCH₂CH₃ (3 đồng phân cho alcohol bậc 1).' },
      { q: 'Xà phòng hóa 0,1 mol triolein cần vừa đủ V mL dung dịch KOH 1M. Giá trị của V là', opts: ['100 mL', '200 mL', '300 mL', '400 mL'], ans: 2, level: 'Vận dụng', exp: '1 mol triglyceride phản ứng với 3 mol KOH → n(KOH) = 0,3 mol → V = 0,3 / 1 = 0,3 L = 300 mL.' }
    ],
    part2: [
      {
        q: 'Câu 19: Cho thông tin về hai ester X (ethyl formate) và Y (methyl acetate):',
        items: [
          { t: 'a) X và Y là đồng phân cấu tạo của nhau và đều có công thức phân tử C₃H₆O₂.', ans: true },
          { t: 'b) Cả X và Y đều có khả năng tham gia phản ứng tráng bạc với thuốc thử Tollens.', ans: false },
          { t: 'c) Thủy phân X trong môi trường base thu được muối formate.', ans: true },
          { t: 'd) Ở điều kiện thường, cả X và Y đều tan vô hạn trong nước do tạo liên kết hydrogen mạnh.', ans: false }
        ],
        exp: 'Ý b sai vì chỉ có ethyl formate (gốc HCOO-) tráng bạc. Ý d sai vì ester không tạo liên kết hydrogen mạnh với nước nên ít tan.'
      },
      {
        q: 'Câu 20: Tiến hành thí nghiệm điều chế xà phòng từ dầu dừa và dung dịch NaOH:',
        items: [
          { t: 'a) Sau khi đun sôi nhẹ hỗn hợp khoảng 30 phút, cần thêm dung dịch NaCl bão hòa để xà phòng kết tinh nổi lên.', ans: true },
          { t: 'b) Dung dịch NaCl bão hòa làm tăng khối lượng riêng của dung dịch và giảm độ tan của muối carboxylate.', ans: true },
          { t: 'c) Trong quá trình đun, không cần thêm nước cất vì hỗn hợp đã có đủ nước.', ans: false },
          { t: 'd) Phần chất lỏng còn lại sau khi tách xà phòng có chứa glycerol.', ans: true }
        ],
        exp: 'Ý c sai vì quá trình đun nước bay hơi cần bổ sung nước để giữ thể tích hỗn hợp không bị cạn.'
      },
      {
        q: 'Câu 21: Cho các nhận định về chất béo và acid béo omega:',
        items: [
          { t: 'a) Omega-3 và omega-6 là các acid béo không no thiết yếu cơ thể người không tự tổng hợp được.', ans: true },
          { t: 'b) Triolein phản ứng được với dung dịch nước bromine ở nhiệt độ thường.', ans: true },
          { t: 'c) Mỡ động vật để lâu ngày trong không khí bị ôi thiu do tạo ra hợp chất muối kiềm.', ans: false },
          { t: 'd) Phản ứng hydrogen hóa dầu thực vật lỏng được ứng dụng để sản xuất bơ thực vật nhân tạo.', ans: true }
        ],
        exp: 'Ý c sai vì ôi thiu do liên kết C=C bị oxi hóa chậm thành peroxide rồi phân hủy thành aldehyde/ketone có mùi ôi.'
      },
      {
        q: 'Câu 22: Xét phản ứng thủy phân ester no, đơn chức, mạch hở E trong môi trường kiềm:',
        items: [
          { t: 'a) Phản ứng luôn thu được sản phẩm gồm 1 muối và 1 alcohol.', ans: true },
          { t: 'b) Số mol NaOH phản ứng luôn bằng số mol của ester E.', ans: true },
          { t: 'c) Nếu đốt cháy hoàn toàn ester E thì thu được số mol CO₂ lớn hơn số mol H₂O.', ans: false },
          { t: 'd) Ester E có thể được điều chế trực tiếp từ carboxylic acid và alcohol tương ứng.', ans: true }
        ],
        exp: 'Ý c sai vì ester no, đơn chức mạch hở (CnH2nO2) khi đốt cháy luôn cho n(CO2) = n(H2O).'
      }
    ],
    part3: [
      { q: 'Câu 23: Phân tử ethyl acetate (CH₃COOC₂H₅) chứa bao nhiêu nguyên tử hydrogen?', ans: '8', exp: 'C₄H₈O₂ có 8 nguyên tử H.' },
      { q: 'Câu 24: Đốt cháy hoàn toàn 0,1 mol ester no, đơn chức, mạch hở X thu được bao nhiêu mol CO₂, biết X có công thức phân tử C₃H₆O₂?', ans: '0.3', exp: '1 mol C₃H₆O₂ cho 3 mol CO₂ → 0,1 mol cho 0,3 mol CO₂.' },
      { q: 'Câu 25: Cho 0,05 mol tristearin tác dụng hết với dung dịch NaOH đun nóng. Số gam glycerol thu được là bao nhiêu? (Làm tròn đến 1 chữ số thập phân)', ans: '4.6', exp: 'n(glycerol) = 0,05 mol → m = 0,05 × 92 = 4,6 gam.' },
      { q: 'Câu 26: Có bao nhiêu đồng phân ester ứng với công thức phân tử C₂H₄O₂?', ans: '1', exp: 'Chỉ có 1 ester duy nhất là methyl formate HCOOCH₃.' },
      { q: 'Câu 27: Xà phòng hóa hoàn toàn 17,6 gam ethyl acetate bằng dung dịch NaOH vừa đủ. Khối lượng muối CH₃COONa thu được là bao nhiêu gam?', ans: '16.4', exp: 'n = 17,6 / 88 = 0,2 mol → m(muối) = 0,2 × 82 = 16,4 gam.' },
      { q: 'Câu 28: Một phân tử triolein ((C₁₇H₃₃COO)₃C₃H₅) có thể cộng tối đa bao nhiêu phân tử H₂ khi có xúc tác Ni đun nóng?', ans: '3', exp: 'Mỗi gốc C₁₇H₃₃COO- có 1 liên kết đôi C=C, 3 gốc có 3 liên kết đôi nên cộng tối đa 3 H₂.' }
    ]
  }
};

export const PERIODIC_ELEMENTS: PeriodicElement[] = [
  { z: 1, sym: 'H', name: 'Hydrogen', m: 1.008, cat: 'phi-kim', conf: '1s¹', en: 2.20, desc: 'Nguyên tố nhẹ nhất, chiếm phần lớn khối lượng vật chất nhìn thấy.' },
  { z: 2, sym: 'He', name: 'Helium', m: 4.003, cat: 'khi-hiem', conf: '1s²', en: null, desc: 'Khí trơ, không cháy, dùng bơm khinh khí cầu và làm lạnh siêu dẫn.' },
  { z: 3, sym: 'Li', name: 'Lithium', m: 6.941, cat: 'kim-loai-kiem', conf: '[He] 2s¹', en: 0.98, desc: 'Kim loại nhẹ nhất, ứng dụng quan trọng trong pin Lithium-ion.' },
  { z: 4, sym: 'Be', name: 'Beryllium', m: 9.012, cat: 'kiem-tho', conf: '[He] 2s²', en: 1.57, desc: 'Kim loại kiềm thổ cứng, tạo hợp kim bền nhẹ trong hàng không vũ trụ.' },
  { z: 5, sym: 'B', name: 'Boron', m: 10.81, cat: 'phi-kim', conf: '[He] 2s²2p¹', en: 2.04, desc: 'Á kim, dùng chế tạo thủy tinh borosilicate chịu nhiệt.' },
  { z: 6, sym: 'C', name: 'Carbon', m: 12.011, cat: 'phi-kim', conf: '[He] 2s²2p²', en: 2.55, desc: 'Cơ sở của mọi hợp chất hữu cơ và sự sống trên Trái Đất.' },
  { z: 7, sym: 'N', name: 'Nitrogen', m: 14.007, cat: 'phi-kim', conf: '[He] 2s²2p³', en: 3.04, desc: 'Khí trơ ở nhiệt độ thường do liên kết ba bền vững N≡N, chiếm 78% khí quyển.' },
  { z: 8, sym: 'O', name: 'Oxygen', m: 15.999, cat: 'phi-kim', conf: '[He] 2s²2p⁴', en: 3.44, desc: 'Chất duy trì sự sống và sự cháy, nguyên tố phổ biến nhất vỏ Trái Đất.' },
  { z: 9, sym: 'F', name: 'Fluorine', m: 18.998, cat: 'phi-kim', conf: '[He] 2s²2p⁵', en: 3.98, desc: 'Phi kim có độ âm điện lớn nhất, tính oxi hóa mạnh nhất.' },
  { z: 10, sym: 'Ne', name: 'Neon', m: 20.180, cat: 'khi-hiem', conf: '[He] 2s²2p⁶', en: null, desc: 'Khí hiếm phát ra ánh sáng đỏ cam trong đèn quảng cáo neon.' },
  { z: 11, sym: 'Na', name: 'Sodium', m: 22.990, cat: 'kim-loai-kiem', conf: '[Ne] 3s¹', en: 0.93, desc: 'Kim loại kiềm mềm, phản ứng mãnh liệt với nước, cháy cho ngọn lửa vàng.' },
  { z: 12, sym: 'Mg', name: 'Magnesium', m: 24.305, cat: 'kiem-tho', conf: '[Ne] 3s²', en: 1.31, desc: 'Cháy với ngọn lửa trắng chói lòa, là thành phần diệp lục tố.' },
  { z: 13, sym: 'Al', name: 'Aluminium', m: 26.982, cat: 'chuyen-tiep', conf: '[Ne] 3s²3p¹', en: 1.61, desc: 'Kim loại phổ biến nhất vỏ Trái Đất, có màng Al₂O₃ bảo vệ bền vững.' },
  { z: 14, sym: 'Si', name: 'Silicon', m: 28.085, cat: 'phi-kim', conf: '[Ne] 3s²3p²', en: 1.90, desc: 'Chất bán dẫn then chốt của kỷ nguyên công nghệ máy tính.' },
  { z: 15, sym: 'P', name: 'Phosphorus', m: 30.974, cat: 'phi-kim', conf: '[Ne] 3s²3p³', en: 2.19, desc: 'Có 2 dạng thù hình chính: P trắng độc tự bốc cháy, P đỏ làm diêm.' },
  { z: 16, sym: 'S', name: 'Sulfur', m: 32.066, cat: 'phi-kim', conf: '[Ne] 3s²3p⁴', en: 2.58, desc: 'Chất rắn màu vàng, dùng lưu hóa cao su và sản xuất acid H₂SO₄.' },
  { z: 17, sym: 'Cl', name: 'Chlorine', m: 35.453, cat: 'phi-kim', conf: '[Ne] 3s²3p⁵', en: 3.16, desc: 'Khí vàng lục mùi xốc độc, tính oxi hóa mạnh, dùng khử trùng nước sinh hoạt.' },
  { z: 18, sym: 'Ar', name: 'Argon', m: 39.948, cat: 'khi-hiem', conf: '[Ne] 3s²3p⁶', en: null, desc: 'Khí hiếm phổ biến nhất trong khí quyển (~0.93%), môi trường trơ khi hàn.' },
  { z: 19, sym: 'K', name: 'Potassium', m: 39.098, cat: 'kim-loai-kiem', conf: '[Ar] 4s¹', en: 0.82, desc: 'Kim loại kiềm rất hoạt động, nguyên tố dinh dưỡng khoáng đa lượng cho cây trồng.' },
  { z: 20, sym: 'Ca', name: 'Calcium', m: 40.078, cat: 'kiem-tho', conf: '[Ar] 4s²', en: 1.00, desc: 'Thành phần chính của xương, vỏ sò, đá vôi (CaCO₃) và thạch cao.' },
  { z: 24, sym: 'Cr', name: 'Chromium', m: 51.996, cat: 'chuyen-tiep', conf: '[Ar] 3d⁵4s¹', en: 1.66, desc: 'Kim loại cứng nhất, không gỉ, thành phần quan trọng trong thép inox.' },
  { z: 25, sym: 'Mn', name: 'Manganese', m: 54.938, cat: 'chuyen-tiep', conf: '[Ar] 3d⁵4s²', en: 1.55, desc: 'Thuốc tím KMnO₄ là chất oxi hóa mạnh thông dụng trong chuẩn độ.' },
  { z: 26, sym: 'Fe', name: 'Iron', m: 55.845, cat: 'chuyen-tiep', conf: '[Ar] 3d⁶4s²', en: 1.83, desc: 'Kim loại có ứng dụng nhiều nhất trong công nghiệp, trung tâm hemoglobin.' },
  { z: 27, sym: 'Co', name: 'Cobalt', m: 58.933, cat: 'chuyen-tiep', conf: '[Ar] 3d⁷4s²', en: 1.88, desc: 'Kim loại có từ tính, thành phần trung tâm vitamin B12.' },
  { z: 28, sym: 'Ni', name: 'Nickel', m: 58.693, cat: 'chuyen-tiep', conf: '[Ar] 3d⁸4s²', en: 1.91, desc: 'Chống ăn mòn tốt, xúc tác hydro hóa dầu thực vật thành bơ.' },
  { z: 29, sym: 'Cu', name: 'Copper', m: 63.546, cat: 'chuyen-tiep', conf: '[Ar] 3d¹⁰4s¹', en: 1.90, desc: 'Kim loại màu đỏ cam dẻo, dẫn điện dẫn nhiệt tuyệt vời chỉ sau Ag.' },
  { z: 30, sym: 'Zn', name: 'Zinc', m: 65.38, cat: 'chuyen-tiep', conf: '[Ar] 3d¹⁰4s²', en: 1.65, desc: 'Mạ kẽm bảo vệ sắt thép, hợp kim đồng thau và pin kẽm-carbon.' },
  { z: 35, sym: 'Br', name: 'Bromine', m: 79.904, cat: 'phi-kim', conf: '[Ar] 3d¹⁰4s²4p⁵', en: 2.96, desc: 'Phi kim duy nhất ở thể lỏng màu nâu đỏ dễ bay hơi ở nhiệt độ phòng.' },
  { z: 47, sym: 'Ag', name: 'Silver', m: 107.868, cat: 'chuyen-tiep', conf: '[Kr] 4d¹⁰5s¹', en: 1.93, desc: 'Kim loại dẫn điện và dẫn nhiệt tốt nhất trong tất cả các kim loại.' },
  { z: 53, sym: 'I', name: 'Iodine', m: 126.904, cat: 'phi-kim', conf: '[Kr] 4d¹⁰5s²5p⁵', en: 2.66, desc: 'Tinh thể màu tím đen thăng hoa khi đun nóng, tác dụng hồ tinh bột hóa xanh.' },
  { z: 56, sym: 'Ba', name: 'Barium', m: 137.327, cat: 'kiem-tho', conf: '[Xe] 6s²', en: 0.89, desc: 'BaSO₄ không tan trong nước và acid, dùng cản quang trong chụp X-quang dạ dày.' },
  { z: 79, sym: 'Au', name: 'Gold', m: 196.967, cat: 'chuyen-tiep', conf: '[Xe] 4f¹⁴5d¹⁰6s¹', en: 2.54, desc: 'Kim loại quý có tính dẻo cao nhất, không bị oxi hóa trong không khí.' }
];

export const ELECTROCHEMICAL_DATA: ElectrochemicalRow[] = [
  { pair: 'K⁺ / K', ox: 'K⁺', red: 'K', e0: -2.925, note: 'Khử nước ở nhiệt độ thường, tính khử rất mạnh' },
  { pair: 'Na⁺ / Na', ox: 'Na⁺', red: 'Na', e0: -2.713, note: 'Khử nước giải phóng khí H₂ mãnh liệt' },
  { pair: 'Mg²⁺ / Mg', ox: 'Mg²⁺', red: 'Mg', e0: -2.370, note: 'Khử H₂O chậm ở t° thường, khử mạnh ở t° cao' },
  { pair: 'Al³⁺ / Al', ox: 'Al³⁺', red: 'Al', e0: -1.660, note: 'Kim loại hoạt động mạnh, có màng oxide bảo vệ' },
  { pair: 'Zn²⁺ / Zn', ox: 'Zn²⁺', red: 'Zn', e0: -0.763, note: 'Tác dụng acid HCl, H₂SO₄ loãng giải phóng H₂' },
  { pair: 'Fe²⁺ / Fe', ox: 'Fe²⁺', red: 'Fe', e0: -0.440, note: 'Bị cation đứng sau (Cu²⁺, Ag⁺) oxi hóa' },
  { pair: 'Ni²⁺ / Ni', ox: 'Ni²⁺', red: 'Ni', e0: -0.257, note: 'Tan chậm trong acid loãng' },
  { pair: 'Sn²⁺ / Sn', ox: 'Sn²⁺', red: 'Sn', e0: -0.136, note: 'Đứng ngay trước Hydrogen' },
  { pair: 'Pb²⁺ / Pb', ox: 'Pb²⁺', red: 'Pb', e0: -0.126, note: 'Tạo muối PbSO₄, PbCl₂ ít tan cản trở phản ứng' },
  { pair: '2H⁺ / H₂', ox: '2H⁺', red: 'H₂', e0: 0.000, note: 'MỐC THẾ ĐIỆN CỰC CHUẨN SO SÁNH (E° = 0.00V)' },
  { pair: 'Cu²⁺ / Cu', ox: 'Cu²⁺', red: 'Cu', e0: +0.340, note: 'Không tan trong HCl/H₂SO₄ loãng, tan trong HNO₃' },
  { pair: 'Fe³⁺ / Fe²⁺', ox: 'Fe³⁺', red: 'Fe²⁺', e0: +0.771, note: 'Quy tắc α: Cu + 2Fe³⁺ → Cu²⁺ + 2Fe²⁺' },
  { pair: 'Ag⁺ / Ag', ox: 'Ag⁺', red: 'Ag', e0: +0.799, note: 'Quy tắc α: Fe²⁺ + Ag⁺ → Fe³⁺ + Ag↓' },
  { pair: 'Au³⁺ / Au', ox: 'Au³⁺', red: 'Au', e0: +1.520, note: 'Kim loại kém hoạt động nhất, trơ với acid thông thường' }
];

export const SOLUBILITY_DATA = {
  cations: ['H⁺', 'Na⁺', 'K⁺', 'NH₄⁺', 'Ba²⁺', 'Ca²⁺', 'Mg²⁺', 'Al³⁺', 'Fe²⁺', 'Fe³⁺', 'Cu²⁺', 'Ag⁺', 'Zn²⁺', 'Pb²⁺'],
  anions: ['OH⁻', 'Cl⁻', 'NO₃⁻', 'SO₄²⁻', 'CO₃²⁻', 'SO₃²⁻', 'PO₄³⁻', 'S²⁻'],
  grid: {
    'H⁺': { 'OH⁻':'T', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'B', 'SO₃²⁻':'B', 'PO₄³⁻':'T', 'S²⁻':'T' },
    'Na⁺': { 'OH⁻':'T', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'T', 'SO₃²⁻':'T', 'PO₄³⁻':'T', 'S²⁻':'T' },
    'K⁺': { 'OH⁻':'T', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'T', 'SO₃²⁻':'T', 'PO₄³⁻':'T', 'S²⁻':'T' },
    'NH₄⁺': { 'OH⁻':'T', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'T', 'SO₃²⁻':'T', 'PO₄³⁻':'T', 'S²⁻':'T' },
    'Ba²⁺': { 'OH⁻':'T', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'K (Trắng)', 'CO₃²⁻':'K (Trắng)', 'SO₃²⁻':'K (Trắng)', 'PO₄³⁻':'K (Trắng)', 'S²⁻':'T' },
    'Ca²⁺': { 'OH⁻':'I', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'I', 'CO₃²⁻':'K (Trắng)', 'SO₃²⁻':'K (Trắng)', 'PO₄³⁻':'K (Trắng)', 'S²⁻':'T' },
    'Mg²⁺': { 'OH⁻':'K (Trắng)', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'I', 'SO₃²⁻':'I', 'PO₄³⁻':'K (Trắng)', 'S²⁻':'B' },
    'Al³⁺': { 'OH⁻':'K (Keo trắng)', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'B', 'SO₃²⁻':'B', 'PO₄³⁻':'K (Trắng)', 'S²⁻':'B' },
    'Fe²⁺': { 'OH⁻':'K (Trắng xanh)', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'K (Trắng)', 'SO₃²⁻':'K (Trắng)', 'PO₄³⁻':'K', 'S²⁻':'K (Đen)' },
    'Fe³⁺': { 'OH⁻':'K (Nâu đỏ)', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'B', 'SO₃²⁻':'B', 'PO₄³⁻':'K (Vàng nâu)', 'S²⁻':'B' },
    'Cu²⁺': { 'OH⁻':'K (Xanh lam)', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'B', 'SO₃²⁻':'B', 'PO₄³⁻':'K (Xanh)', 'S²⁻':'K (Đen)' },
    'Ag⁺': { 'OH⁻':'B (Ag₂O đen)', 'Cl⁻':'K (Trắng)', 'NO₃⁻':'T', 'SO₄²⁻':'I', 'CO₃²⁻':'K (Vàng)', 'SO₃²⁻':'K (Trắng)', 'PO₄³⁻':'K (Vàng)', 'S²⁻':'K (Đen)' },
    'Zn²⁺': { 'OH⁻':'K (Keo trắng)', 'Cl⁻':'T', 'NO₃⁻':'T', 'SO₄²⁻':'T', 'CO₃²⁻':'K (Trắng)', 'SO₃²⁻':'K (Trắng)', 'PO₄³⁻':'K (Trắng)', 'S²⁻':'K (Trắng)' },
    'Pb²⁺': { 'OH⁻':'K (Trắng)', 'Cl⁻':'I (Tan t° cao)', 'NO₃⁻':'T', 'SO₄²⁻':'K (Trắng)', 'CO₃²⁻':'K (Trắng)', 'SO₃²⁻':'K (Trắng)', 'PO₄³⁻':'K (Trắng)', 'S²⁻':'K (Đen)' }
  } as Record<string, Record<string, string>>
};
