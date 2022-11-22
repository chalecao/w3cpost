---
title: npm版本号



---
npm版本号参考：https://www.npmjs.cn/misc/semver/

## Versions

A &#8220;version&#8221; is described by the `v2.0.0` specification found at <http://semver.org/>.

A leading `"="` or `"v"` character is stripped off and ignored.

## <a id="ranges" class="anchor" href="https://www.npmjs.cn/misc/semver/#ranges" aria-hidden="true"></a>Ranges

A `version range` is a set of `comparators` which specify versions that satisfy the range.

A `comparator` is composed of an `operator` and a `version`. The set of primitive `operators` is:

* `<` Less than
* `<=` Less than or equal to
* `>` Greater than
* `>=` Greater than or equal to
* `=` Equal. If no operator is specified, then equality is assumed, so this operator is optional, but MAY be included.

For example, the comparator `>=1.2.7` would match the versions `1.2.7`, `1.2.8`, `2.5.3`, and `1.3.9`, but not the versions `1.2.6` or `1.1.0`.

Comparators can be joined by whitespace to form a `comparator set`, which is satisfied by the **intersection** of all of the comparators it includes.

A range is composed of one or more comparator sets, joined by `||`. A version matches a range if and only if every comparator in at least one of the `||`-separated comparator sets is satisfied by the version.

For example, the range `>=1.2.7 <1.3.0` would match the versions `1.2.7`, `1.2.8`, and `1.2.99`, but not the versions `1.2.6`, `1.3.0`, or `1.1.0`.

The range `1.2.7 || >=1.2.9 <2.0.0` would match the versions `1.2.7`, `1.2.9`, and `1.4.6`, but not the versions `1.2.8` or `2.0.0`.

### <a id="prerelease-tags" class="anchor" href="https://www.npmjs.cn/misc/semver/#prerelease-tags" aria-hidden="true"></a>Prerelease Tags

If a version has a prerelease tag (for example, `1.2.3-alpha.3`) then it will only be allowed to satisfy comparator sets if at least one comparator with the same `[major, minor, patch]` tuple also has a prerelease tag.

For example, the range `>1.2.3-alpha.3` would be allowed to match the version `1.2.3-alpha.7`, but it would _not_ be satisfied by `3.4.5-alpha.9`, even though `3.4.5-alpha.9` is technically &#8220;greater than&#8221; `1.2.3-alpha.3` according to the SemVer sort rules. The version range only accepts prerelease tags on the `1.2.3` version. The version `3.4.5` _would_ satisfy the range, because it does not have a prerelease flag, and `3.4.5` is greater than `1.2.3-alpha.7`.

The purpose for this behavior is twofold. First, prerelease versions frequently are updated very quickly, and contain many breaking changes that are (by the author&#8217;s design) not yet fit for public consumption. Therefore, by default, they are excluded from range matching semantics.

Second, a user who has opted into using a prerelease version has clearly indicated the intent to use _that specific_ set of alpha/beta/rc versions. By including a prerelease tag in the range, the user is indicating that they are aware of the risk. However, it is still not appropriate to assume that they have opted into taking a similar risk on the _next_ set of prerelease versions.

#### <a id="prerelease-identifiers" class="anchor" href="https://www.npmjs.cn/misc/semver/#prerelease-identifiers" aria-hidden="true"></a>Prerelease Identifiers

The method `.inc` takes an additional `identifier` string argument that will append the value of the string as a prerelease identifier:

<div class="highlight javascript">
  <div class="line">
    <span class="source js"><span class="variable other object js">semver</span><span class="meta method-call js"><span class="meta delimiter method period js">.</span><span class="entity name function js">inc</span><span class="meta arguments js"><span class="punctuation definition arguments begin bracket round js">(</span><span class="string quoted single js"><span class="punctuation definition string begin js">&#8216;</span>1.2.3<span class="punctuation definition string end js">&#8216;</span></span><span class="meta delimiter object comma js">,</span> <span class="string quoted single js"><span class="punctuation definition string begin js">&#8216;</span>prerelease<span class="punctuation definition string end js">&#8216;</span></span><span class="meta delimiter object comma js">,</span> <span class="string quoted single js"><span class="punctuation definition string begin js">&#8216;</span>beta<span class="punctuation definition string end js">&#8216;</span></span><span class="punctuation definition arguments end bracket round js">)</span></span></span></span>
  </div>
  
  <div class="line">
    <span class="source js"><span class="comment line double-slash js"><span class="punctuation definition comment js">//</span> &#8216;1.2.4-beta.0&#8217;</span></span>
  </div>
</div>

command-line example:

<div class="highlight sh">
  <div class="line">
    <span class="source shell">$ semver 1.2.3 -i prerelease &#8211;preid beta</span>
  </div>
  
  <div class="line">
    <span class="source shell">1.2.4-beta.0</span>
  </div>
</div>

Which then can be used to increment further:

<div class="highlight sh">
  <div class="line">
    <span class="source shell">$ semver 1.2.4-beta.0 -i prerelease</span>
  </div>
  
  <div class="line">
    <span class="source shell">1.2.4-beta.1</span>
  </div>
</div>

### <a id="advanced-range-syntax" class="anchor" href="https://www.npmjs.cn/misc/semver/#advanced-range-syntax" aria-hidden="true"></a>Advanced Range Syntax

Advanced range syntax desugars to primitive comparators in deterministic ways.

Advanced ranges may be combined in the same way as primitive comparators using white space or `||`.

#### <a id="hyphen-ranges-xyz---abc" class="anchor" href="https://www.npmjs.cn/misc/semver/#hyphen-ranges-xyz---abc" aria-hidden="true"></a>Hyphen Ranges `X.Y.Z - A.B.C`

Specifies an inclusive set.

* `1.2.3 - 2.3.4` := `>=1.2.3 <=2.3.4`

If a partial version is provided as the first version in the inclusive range, then the missing pieces are replaced with zeroes.

* `1.2 - 2.3.4` := `>=1.2.0 <=2.3.4`

If a partial version is provided as the second version in the inclusive range, then all versions that start with the supplied parts of the tuple are accepted, but nothing that would be greater than the provided tuple parts.

* `1.2.3 - 2.3` := `>=1.2.3 <2.4.0`
* `1.2.3 - 2` := `>=1.2.3 <3.0.0`

#### <a id="x-ranges-12x-1x-12-" class="anchor" href="https://www.npmjs.cn/misc/semver/#x-ranges-12x-1x-12-" aria-hidden="true"></a>X-Ranges `1.2.x` `1.X` `1.2.*` `*`

Any of `X`, `x`, or `*` may be used to &#8220;stand in&#8221; for one of the numeric values in the `[major, minor, patch]` tuple.

* `*` := `>=0.0.0` (Any version satisfies)
* `1.x` := `>=1.0.0 <2.0.0` (Matching major version)
* `1.2.x` := `>=1.2.0 <1.3.0` (Matching major and minor versions)

A partial version range is treated as an X-Range, so the special character is in fact optional.

* `""` (empty string) := `*` := `>=0.0.0`
* `1` := `1.x.x` := `>=1.0.0 <2.0.0`
* `1.2` := `1.2.x` := `>=1.2.0 <1.3.0`

#### <a id="tilde-ranges-123-12-1" class="anchor" href="https://www.npmjs.cn/misc/semver/#tilde-ranges-123-12-1" aria-hidden="true"></a>Tilde Ranges `~1.2.3` `~1.2` `~1`

Allows patch-level changes if a minor version is specified on the comparator. Allows minor-level changes if not.

* `~1.2.3` := `>=1.2.3 <1.(2+1).0` := `>=1.2.3 <1.3.0`
* `~1.2` := `>=1.2.0 <1.(2+1).0` := `>=1.2.0 <1.3.0` (Same as `1.2.x`)
* `~1` := `>=1.0.0 <(1+1).0.0` := `>=1.0.0 <2.0.0` (Same as `1.x`)
* `~0.2.3` := `>=0.2.3 <0.(2+1).0` := `>=0.2.3 <0.3.0`
* `~0.2` := `>=0.2.0 <0.(2+1).0` := `>=0.2.0 <0.3.0` (Same as `0.2.x`)
* `~0` := `>=0.0.0 <(0+1).0.0` := `>=0.0.0 <1.0.0` (Same as `0.x`)
* `~1.2.3-beta.2` := `>=1.2.3-beta.2 <1.3.0` Note that prereleases in the `1.2.3` version will be allowed, if they are greater than or equal to `beta.2`. So, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not, because it is a prerelease of a different `[major, minor, patch]` tuple.

#### <a id="caret-ranges-123-025-004" class="anchor" href="https://www.npmjs.cn/misc/semver/#caret-ranges-123-025-004" aria-hidden="true"></a>Caret Ranges `^1.2.3` `^0.2.5` `^0.0.4`

Allows changes that do not modify the left-most non-zero digit in the `[major, minor, patch]` tuple. In other words, this allows patch and minor updates for versions `1.0.0` and above, patch updates for versions `0.X >=0.1.0`, and <span style="color: #ff0000;"><strong><em>no</em> updates for versions <code>0.0.X</code>.</strong></span>

Many authors treat a `0.x` version as if the `x` were the major &#8220;breaking-change&#8221; indicator.

Caret ranges are ideal when an author may make breaking changes between `0.2.4` and `0.3.0` releases, which is a common practice. However, it presumes that there will _not_ be breaking changes between `0.2.4` and `0.2.5`. It allows for changes that are presumed to be additive (but non-breaking), according to commonly observed practices.

* `^1.2.3` := `>=1.2.3 <2.0.0`
* `^0.2.3` := `>=0.2.3 <0.3.0`
* `^0.0.3` := `>=0.0.3 <0.0.4`
* `^1.2.3-beta.2` := `>=1.2.3-beta.2 <2.0.0` Note that prereleases in the `1.2.3` version will be allowed, if they are greater than or equal to `beta.2`. So, `1.2.3-beta.4` would be allowed, but `1.2.4-beta.2` would not, because it is a prerelease of a different `[major, minor, patch]` tuple.
* `^0.0.3-beta` := `>=0.0.3-beta <0.0.4` Note that prereleases in the `0.0.3` version _only_ will be allowed, if they are greater than or equal to `beta`. So, `0.0.3-pr.2` would be allowed.

When parsing caret ranges, a missing `patch` value desugars to the number ``, but will allow flexibility within that value, even if the major and minor versions are both``.

* `^1.2.x` := `>=1.2.0 <2.0.0`
* `^0.0.x` := `>=0.0.0 <0.1.0`
* `^0.0` := `>=0.0.0 <0.1.0`

A missing `minor` and `patch` values will desugar to zero, but also allow flexibility within those values, even if the major version is zero.

* `^1.x` := `>=1.0.0 <2.0.0`
* `^0.x` := `>=0.0.0 <1.0.0`
