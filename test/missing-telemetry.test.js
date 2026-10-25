import test from 'node:test';
import assert from 'node:assert/strict';
import {calculateHealth,detectAnomalies} from '../src/analytics.js';
test('missing measurements stay unavailable rather than poisoning health',()=>{
 const result=calculateHealth({localizationQuality:80},{battery:true,sensors:true});
 assert.equal(result.overall,80);
 assert.deepEqual(result.components,{sensors:80});
 assert.equal(calculateHealth({},{battery:true}).overall,null);
});
test('an anomaly without historical readings has an unavailable baseline',()=>{
 const a=detectAnomalies([{}, {}, {}, {motorCurrent:6,observedAt:'2026-10-25T00:00:00Z'}])[0];
 assert.equal(a.baselineMean,null);assert.equal(a.zScore,null);
});
