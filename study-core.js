(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StudyCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function hashSeed(value) { let h = 2166136261; for (const c of String(value)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = hashSeed(seed); return function () { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function shuffle(list, random) { const a = list.slice(); for (let i=a.length-1;i>0;i--) { const j=Math.floor(random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function sample(list, n, random) { return shuffle(list, random).slice(0,n); }
  function makeAssignment(settings, claimsConfig, scenes, seed) {
    const random=rng(seed), relevant=settings.relevantIdentity;
    const irrelevantPool=shuffle(settings.irrelevantIdentities,random);
    const exposedIrrelevantGroups=irrelevantPool.slice(0,settings.exposedPerCondition);
    const need=2*(settings.exposedPerCondition+settings.newPerCondition);
    if (claimsConfig.claims.length < need) throw new Error(`At least ${need} claim families are required.`);
    const bases=sample(claimsConfig.claims,need,random);
    const conditions=[];
    for(let i=0;i<settings.exposedPerCondition;i++)conditions.push({condition:'relevant',status:'old',group:relevant});
    for(let i=0;i<settings.exposedPerCondition;i++)conditions.push({condition:'irrelevant',status:'old',group:exposedIrrelevantGroups[i]});
    for(let i=0;i<settings.newPerCondition;i++)conditions.push({condition:'relevant',status:'new',group:relevant});
    for(let i=0;i<settings.newPerCondition;i++)conditions.push({condition:'irrelevant',status:'new',group:exposedIrrelevantGroups[i%exposedIrrelevantGroups.length]});
    const mixed=shuffle(conditions,random);
    const items=bases.map((base,i)=>({
      claimId:`${base.baseClaimId}-${mixed[i].condition}`,
      baseClaimId:base.baseClaimId,
      relevanceCondition:mixed[i].condition,
      oldNewStatus:mixed[i].status,
      group:mixed[i].group,
      text:base.template.replaceAll('[GROUP]',mixed[i].group),
      scene:null,presentationFormat:null,displayStartTime:null,displayEndTime:null,visibleDuration:null,
      participantChoice:null,truthRating:null,recognitionResponse:null,itemOrder:null
    }));
    const old=shuffle(items.filter(x=>x.oldNewStatus==='old'),random);
    old.forEach((item,i)=>{ item.scene=scenes.scenes[i].id; item.presentationFormat=settings.formats[Math.floor(random()*settings.formats.length)]; });
    const testOrder=shuffle(items,random); testOrder.forEach((x,i)=>x.itemOrder=i+1);
    return {seed:String(seed),irrelevantIdentity:exposedIrrelevantGroups[0],irrelevantIdentities:exposedIrrelevantGroups,items,testOrder:testOrder.map(x=>x.claimId)};
  }
  function validateAssignment(a, settings) {
    const old=a.items.filter(x=>x.oldNewStatus==='old'), fresh=a.items.filter(x=>x.oldNewStatus==='new');
    const counts={relevantOld:old.filter(x=>x.relevanceCondition==='relevant').length,irrelevantOld:old.filter(x=>x.relevanceCondition==='irrelevant').length,relevantNew:fresh.filter(x=>x.relevanceCondition==='relevant').length,irrelevantNew:fresh.filter(x=>x.relevanceCondition==='irrelevant').length};
    const bases=a.items.map(x=>x.baseClaimId);
    return {counts,uniqueBaseClaims:new Set(bases).size===bases.length,noBothVariants:new Set(bases).size===a.items.length,valid:counts.relevantOld===settings.exposedPerCondition&&counts.irrelevantOld===settings.exposedPerCondition&&counts.relevantNew===settings.newPerCondition&&counts.irrelevantNew===settings.newPerCondition&&new Set(bases).size===bases.length};
  }
  return {hashSeed,rng,shuffle,makeAssignment,validateAssignment};
});
