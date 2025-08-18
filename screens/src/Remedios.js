// remedios.js
const bancoRemedios = {
  Paracetamol: {
    descricao: 'Analgésico e antipirético usado para dor e febre.',
    dosagem: '500mg a cada 6h, conforme orientação médica.',
    efeitos: 'Pode causar náuseas ou alergias em algumas pessoas.'
  },
  Ibuprofeno: {
    descricao: 'Anti-inflamatório não esteroidal (AINE) usado para dor e inflamação.',
    dosagem: '400mg a cada 8h, conforme orientação médica.',
    efeitos: 'Pode causar irritação gástrica, não indicado para quem tem úlcera.'
  },
  Donepezila: {
    descricao: 'Inibidor da colinesterase que aumenta os níveis de acetilcolina no cérebro, indicado para todos os estágios do Alzheimer, podendo ser combinado com memantina.',
    dosagem: 'Comprimidos de 5 ou 10 mg ou solução oral, conforme orientação de psiquiatra ou neurologista.',
    efeitos: 'Fadiga, diarreia, náusea, vômitos, falta de apetite e perda de peso.'
  },
  Rivastigmina: {
    descricao: 'Inibidor da colinesterase indicado para casos leves e moderados de Alzheimer, disponível em comprimidos orais ou adesivos subcutâneos.',
    dosagem: 'Conforme orientação médica, em comprimidos orais ou ades photoshop://s3.amazonaws.com/files.ondemand.com/ddd/21/05/18/DDD_210518094647.jpgadesivos subcutâneos de uso diário.',
    efeitos: 'Fraqueza muscular, náusea, vômitos e diarreia.'
  },
  Galantamina: {
    descricao: 'Inibidor da colinesterase indicado para casos leves e moderados de Alzheimer.',
    dosagem: 'Comprimidos de liberação prolongada de 8, 16 ou 24 mg, conforme orientação de psiquiatra ou neurologista.',
    efeitos: 'Tontura, dor de cabeça, náusea, vômitos e diarreia.'
  },
  Memantina: {
    descricao: 'Antagonista do receptor de NMDA, indicado para casos moderados e graves de Alzheimer, previne a perda de neurônios.',
    dosagem: 'Comprimidos, solução oral ou cápsulas de liberação prolongada, conforme orientação de psiquiatra ou neurologista.',
    efeitos: 'Dor de cabeça e confusão mental.'
  },
  Ansiolíticos: {
    descricao: 'Medicamentos como clorpromazina, alprazolam ou zolpidem, indicados para controlar agitação e dificuldade para dormir em casos de Alzheimer.',
    dosagem: 'Conforme orientação médica, usado por curto período de tempo.',
    efeitos: 'Confusão mental, sonolência e tontura.'
  },
  Antidepressivos: {
    descricao: 'Medicamentos como sertralina, nortriptilina, mirtazapina ou trazodona, indicados para depressão ou ansiedade em casos de Alzheimer.',
    dosagem: 'Conforme orientação médica.',
    efeitos: 'Não especificado, depende do medicamento prescrito.'
  },
  Antipsicóticos: {
    descricao: 'Medicamentos como olanzapina, quetiapina e risperidona, indicados para alucinações, paranoia e agitação em casos graves de Alzheimer.',
    dosagem: 'Conforme orientação médica, usado em casos graves.',
    efeitos: 'Riscos graves, incluindo efeitos colaterais potencialmente fatais.'
  },
  ÁcidoAcetilsalicílico: {
    descricao: 'Anti-inflamatório não esteroide (AINE) indicado para dor leve a moderada, inflamação, febre e, em baixas doses, como anticoagulante para reduzir riscos cardiovasculares.',
    dosagem: '1 a 2 comprimidos de 500 mg a cada 4 a 8 horas para dor ou febre, não excedendo 8 comprimidos por dia; conforme orientação médica.',
    efeitos: 'Náuseas, vômitos, diarreia, azia, dor de estômago, risco de sangramentos ou úlceras com uso prolongado.'
  },
  Diclofenaco: {
    descricao: 'Anti-inflamatório não esteroide (AINE) com efeito analgésico e antitérmico, indicado para osteoartrite, reumatismo, cólica menstrual e dor pós-cirúrgica.',
    dosagem: '75 a 150 mg por dia (comprimidos de diclofenaco potássico), conforme orientação médica.',
    efeitos: 'Dor de cabeça, tontura, dor de estômago, náusea, vômito, diarreia, cólicas abdominais, gases, diminuição do apetite, bolhas na pele.'
  },
  Nimesulida: {
    descricao: 'Anti-inflamatório não esteroide (AINE) indicado para dor, inflamação ou febre, como osteoartrite, dor de garganta e cólicas menstruais; também em gel para dores musculares.',
    dosagem: 'Meio a um comprimido de 100 mg a cada 12 horas, após refeição, conforme orientação médica.',
    efeitos: 'Diarreia, náuseas, vômitos, coceira, inchaço na pele, suor excessivo, prisão de ventre, gastrite, tonturas, aumento da pressão arterial.'
  },
  Dexametasona: {
    descricao: 'Corticoide indicado para problemas alérgicos e inflamatórios agudos ou crônicos, como distúrbios reumáticos, pulmonares, da pele ou gastrointestinais.',
    dosagem: '0,75 a 15 mg por dia (comprimidos ou elixir), conforme orientação médica.',
    efeitos: 'Retenção de líquidos, insuficiência cardíaca, aumento da pressão arterial, fraqueza muscular, osteoporose, problemas gastrointestinais, acne, urticária.'
  },
  Betametasona: {
    descricao: 'Corticoide com ação anti-inflamatória, indicado para dermatite, urticária, artrite reumatoide, asma e lúpus.',
    dosagem: '0,25 a 8,0 mg por dia (comprimidos), conforme orientação médica.',
    efeitos: 'Pressão alta, coceira, fraqueza muscular, osteoporose, inflamação do pâncreas, inchaço abdominal, esofaringite ulcerativa.'
  },
  Prednisona: {
    descricao: 'Corticoide com efeito anti-inflamatório, antirreumático e antialérgico, indicado para reumatismo, dermatites, lúpus e rinite alérgica.',
    dosagem: '5 a 60 mg por dia, conforme orientação médica.',
    efeitos: 'Aumento do apetite, má digestão, úlcera no estômago, pancreatite, esofagite ulcerativa, nervosismo, cansaço, insônia.'
  },
  Prednisolona: {
    descricao: 'Corticoide indicado para reumatismo, lúpus, asma, dermatites e câncer; não sofre metabolismo hepático, ideal para pacientes com doenças do fígado.',
    dosagem: '5 a 60 mg por dia (comprimidos), conforme orientação médica.',
    efeitos: 'Aumento do apetite, má digestão, úlcera no estômago, pancreatite, esofagite ulcerativa, nervosismo, cansaço, insônia, diabetes mellitus latente.'
  },
  Kisunla: {
    descricao: 'Anticorpo monoclonal que remove placas de beta-amiloide no cérebro, indicado para comprometimento cognitivo leve ou demência leve associada ao Alzheimer em pacientes não portadores ou heterozigotos do gene ApoE ε4.',
    dosagem: 'Infusão intravenosa de 700 mg a cada 4 semanas para as 3 primeiras doses, seguida por 1400 mg a cada 4 semanas, até depuração da placa amiloide ou por até 18 meses.',
    efeitos: 'Reações relacionadas à infusão (febre, sintomas gripais), dores de cabeça, anormalidades relacionadas à proteína amiloide (ARIA, como inchaço cerebral ou pequenos sangramentos).'
  },
   
 
};

export default bancoRemedios;
