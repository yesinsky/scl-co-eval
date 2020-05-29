module.exports = {
  name: 'scl-co-eval',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/scl-co-eval',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
