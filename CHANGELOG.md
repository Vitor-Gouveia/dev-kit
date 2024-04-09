# Changelog

## [Unreleased]

## [1.6.0] - 2024-04-09
### Added
  - Add 'init' command to initialize husky in service

### Fixed
  - Add step in 'update' command to create new github actions dangerfile template
  - Use `path()` in 'danger' command to correctly create dangerfile

## [1.5.1] - 2024-04-09
### Fixed
  - Substitute 'dangerfile' file creation with new script to execute on github actions.

## [1.5.0] - 2024-04-05
### Fixed
  - Substitute current dependencies update behaviour in favor of [npm-check-updates](https://www.npmjs.com/package/npm-check-updates).


[Unreleased]: https://github.com/vitor-gouveia/dev-kit/compare/1.6.0...HEAD
[1.6.0]: https://github.com/vitor-gouveia/dev-kit/compare/1.5.1...1.6.0
[1.5.1]: https://github.com/vitor-gouveia/dev-kit/compare/1.5.0...1.5.1
[1.5.0]: https://github.com/vitor-gouveia/dev-kit/compare/1.0.0...1.5.0