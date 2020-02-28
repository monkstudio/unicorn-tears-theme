<header role="banner">
    <h1>HTML5 Test Page</h1>
    <p>This is a test page filled with common HTML elements to be used to provide visual feedback whilst building CSS systems and frameworks.</p>
</header>
<nav role="navigation">
    <ul>
        <li>
            <a href="#text">Text</a>
            <ul>
                <li><a href="#text__headings">Headings</a></li>
                <li><a href="#text__paragraphs">Paragraphs</a></li>
                <li><a href="#text__blockquotes">Blockquotes</a></li>
                <li><a href="#text__lists">Lists</a></li>
                <li><a href="#text__hr">Horizontal rules</a></li>
                <li><a href="#text__tables">Tabular data</a></li>
                <li><a href="#text__code">Code</a></li>
                <li><a href="#text__inline">Inline elements</a></li>
                <li><a href="#text__comments">HTML Comments</a></li>
            </ul>
        </li>
        <li>
            <a href="#embedded">Embedded content</a>
            <ul>
                <li><a href="#embedded__images">Images</a></li>
                <li><a href="#embedded__audio">Audio</a></li>
                <li><a href="#embedded__video">Video</a></li>
                <li><a href="#embedded__canvas">Canvas</a></li>
                <li><a href="#embedded__meter">Meter</a></li>
                <li><a href="#embedded__progress">Progress</a></li>
                <li><a href="#embedded__svg">Inline SVG</a></li>
                <li><a href="#embedded__iframe">IFrames</a></li>
            </ul>
        </li>
        <li>
            <a href="#forms">Form elements</a>
            <ul>
                <li><a href="#forms__input">Input fields</a></li>
                <li><a href="#forms__select">Select menus</a></li>
                <li><a href="#forms__checkbox">Checkboxes</a></li>
                <li><a href="#forms__radio">Radio buttons</a></li>
                <li><a href="#forms__textareas">Textareas</a></li>
                <li><a href="#forms__html5">HTML5 inputs</a></li>
                <li><a href="#forms__action">Action buttons</a></li>
            </ul>
        </li>
    </ul>
</nav>
<main role="main">
    <section id="text">
        <header>
            <h1>Text</h1>
        </header>
        <article id="text__headings">
            <header>
                <h1>Headings</h1>
            </header>
            <div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__paragraphs">
            <header>
                <h1>Paragraphs</h1>
            </header>
            <div>
                <p>A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of formal writing, used to organize longer prose.</p>
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__blockquotes">
            <header>
                <h1>Blockquotes</h1>
            </header>
            <div>
                <blockquote>
                    <p>A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set off from the main text as a paragraph, or block of text.</p>
                    <p>It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It may or may not include a citation, usually placed at the bottom.</p>
                    <cite><a href="#!">Said no one, ever.</a></cite>
                </blockquote>
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__lists">
            <header>
                <h1>Lists</h1>
            </header>
            <div>
                <h3>Definition list</h3>
                <dl>
                    <dt>Definition List Title</dt>
                    <dd>This is a definition list division.</dd>
                </dl>
                <h3>Ordered List</h3>
                <h2>Unordered Lists (Nested)</h2>
                <ul>
                    <li>List item one
                        <ul>
                            <li>List item one
                                <ul>
                                    <li>List item one</li>
                                    <li>List item two</li>
                                    <li>List item three</li>
                                    <li>List item four</li>
                                </ul>
                            </li>
                            <li>List item two</li>
                            <li>List item three</li>
                            <li>List item four</li>
                        </ul>
                    </li>
                    <li>List item two</li>
                    <li>List item three</li>
                    <li>List item four</li>
                </ul>
                <h2>Ordered List (Nested)</h2>
                <ol start="8">
                    <li>List item one -start at 8
                        <ol>
                            <li>List item one
                                <ol reversed="reversed">
                                    <li>List item one -reversed attribute</li>
                                    <li>List item two</li>
                                    <li>List item three</li>
                                    <li>List item four</li>
                                </ol>
                            </li>
                            <li>List item two</li>
                            <li>List item three</li>
                            <li>List item four</li>
                        </ol>
                    </li>
                    <li>List item two</li>
                    <li>List item three</li>
                    <li>List item four</li>
                </ol>
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__hr">
            <header>
                <h1>Horizontal rules</h1>
            </header>
            <div>
                <hr>
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__tables">
            <header>
                <h1>Tabular data</h1>
            </header>
            <table>
                <caption>Table Caption</caption>
                <thead>
                    <tr>
                        <th>Table Heading 1</th>
                        <th>Table Heading 2</th>
                        <th>Table Heading 3</th>
                        <th>Table Heading 4</th>
                        <th>Table Heading 5</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Table Footer 1</th>
                        <th>Table Footer 2</th>
                        <th>Table Footer 3</th>
                        <th>Table Footer 4</th>
                        <th>Table Footer 5</th>
                    </tr>
                </tfoot>
                <tbody>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                    <tr>
                        <td>Table Cell 1</td>
                        <td>Table Cell 2</td>
                        <td>Table Cell 3</td>
                        <td>Table Cell 4</td>
                        <td>Table Cell 5</td>
                    </tr>
                </tbody>
            </table>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__code">
            <header>
                <h1>Code</h1>
            </header>
            <div>
                <p><strong>Keyboard input:</strong> <kbd>Cmd</kbd></p>
                <p><strong>Inline code:</strong> <code>&lt;div&gt;code&lt;/div&gt;</code></p>
                <p><strong>Sample output:</strong> <samp>This is sample output from a computer program.</samp></p>
                <h2>Pre-formatted text</h2>
                <pre>P R E F O R M A T T E D T E X T
  ! " # $ % &amp; ' ( ) * + , - . /
  0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ?
  @ A B C D E F G H I J K L M N O
  P Q R S T U V W X Y Z [ \ ] ^ _
  ` a b c d e f g h i j k l m n o
  p q r s t u v w x y z { | } ~ </pre>
                <pre><cite>Robert Frost</cite>


  Two roads diverged in a yellow wood,
  And sorry I could not travel both          (\_/)
  And be one traveler, long I stood         (='.'=)
  And looked down one as far as I could     (")_(")
  To where it bent in the undergrowth;

  Then took the other, as just as fair,
  And having perhaps the better claim,          |\_/|
  Because it was grassy and wanted wear;       / @ @ \
  Though as for that the passing there        ( &gt; º &lt; )
  Had worn them really about the same,         `&gt;&gt;x&lt;&lt;´
                                               /  O  \
  And both that morning equally lay
  In leaves no step had trodden black.
  Oh, I kept the first for another day!
  Yet knowing how way leads on to way,
  I doubted if I should ever come back.

  I shall be telling this with a sigh
  Somewhere ages and ages hence:
  Two roads diverged in a wood, and I—
  I took the one less traveled by,
  And that has made all the difference.


  and here's a line of some really, really, really, really long text, just to see how it is handled and to find out how it overflows;
</pre>
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__inline">
            <header>
                <h1>Inline elements</h1>
            </header>
            <div>
                <p><a href="#!">This is a text link</a>.</p>
                <p><strong>Quote Tag</strong> for short, inline quotes</p>
                <p><q>Developers, developers, developers...</q> --Steve Ballmer</p>
                <p><strong>Strike Tag</strong> (<em>deprecated in HTML5</em>) and <strong>S Tag</strong></p>
                <p>This tag shows <span style="text-decoration: line-through;">strike-through</span> <s>text</s>.</p>
                <p><strong>Small Tag</strong></p>
                <p>This tag shows <small>smaller<small> text.</small></small></p>
                <p><strong>Strong Tag</strong></p>
                <p>This tag shows <strong>bold<strong> text.</strong></strong></p>
                <p><strong>Subscript Tag</strong></p>
                <p>Getting our science styling on with H<sub>2</sub>O, which should push the "2" down.</p>
                <p><strong>Superscript Tag</strong></p>
                <p>Still sticking with science and Albert Einstein's E = MC<sup>2</sup>, which should lift the 2 up.</p>
                <p><strong>Teletype Tag </strong>(<em>obsolete in HTML5</em>)</p>
                <p>This rarely used tag emulates <tt>teletype text</tt>, which is usually styled like the <code>&lt;code&gt;</code> tag.</p>
                <p><strong>Underline Tag</strong> <em>deprecated in HTML 4, re-introduced in HTML5 with other semantics</em></p>
                <p>This tag shows <u>underlined text</u>.</p>
                <p><strong>Variable Tag</strong></p>
                <p>This allows you to denote <var>variables</var>.</p>
                <p><strong>Strong is used to indicate strong importance.</strong></p>
                <p><em>This text has added emphasis.</em></p>
                <p>The <b>b element</b> is stylistically different text from normal text, without any special importance.</p>
                <p>The <i>i element</i> is text that is offset from the normal text.</p>
                <p>The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.</p>
                <p><del>This text is deleted</del> and <ins>This text is inserted</ins>.</p>
                <p><s>This text has a strikethrough</s>.</p>
                <p>Superscript<sup>®</sup>.</p>
                <p>Subscript for things like H<sub>2</sub>O.</p>
                <p><small>This small text is small for for fine print, etc.</small></p>
                <p>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></p>
                <p><q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">This text is a short inline quotation.</q></p>
                <p><cite>This is a citation.</cite></p>
                <p>The <dfn>dfn element</dfn> indicates a definition.</p>
                <p>The <mark>mark element</mark> indicates a highlight.</p>
                <p>The <var>variable element</var>, such as <var>x</var> = <var>y</var>.</p>
                <p>The time element: <time datetime="2013-04-06T12:32+00:00">2 weeks ago</time></p>
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="text__comments">
            <header>
                <h1>HTML Comments</h1>
            </header>
            <div>
                <p>There is comment here:
                    <!--This comment should not be displayed-->
                </p>
                <p>There is a comment spanning multiple tags and lines below here.</p>
                <!--<p><a href="#!">This is a text link. But it should not be displayed in a comment</a>.</p>
              <p><strong>Strong is used to indicate strong importance. But, it should not be displayed in a comment</strong></p>
              <p><em>This text has added emphasis. But, it should not be displayed in a comment</em></p>-->
            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
    </section>
    <section id="embedded">
        <header>
            <h1>Embedded content</h1>
        </header>
        <article id="embedded__images">
            <header>
                <h2>Images</h2>
            </header>
            <div>
                <h3>No <code>&lt;figure&gt;</code> element</h3>
                <p><img src="http://placekitten.com/480/480" alt="Image alt text"></p>
                <h3>Wrapped in a <code>&lt;figure&gt;</code> element, no <code>&lt;figcaption&gt;</code></h3>
                <figure><img src="http://placekitten.com/420/420" alt="Image alt text"></figure>
                <h3>Wrapped in a <code>&lt;figure&gt;</code> element, with a <code>&lt;figcaption&gt;</code></h3>
                <figure>
                    <img src="http://placekitten.com/420/420" alt="Image alt text">
                    <figcaption>Here is a caption for this image.</figcaption>
                </figure>


                <p>Welcome to image alignment! The best way to demonstrate the ebb and flow of the various image positioning options is to nestle them snuggly among an ocean of words. Grab a paddle and let's get started.</p>
                <p>On the topic of alignment, it should be noted that users can choose from the options of <em>None</em>, <em>Left</em>, <em>Right, </em>and <em>Center</em>. In addition, they also get the options of <em>Thumbnail</em>, <em>Medium</em>, <em>Large</em> &amp; <em>Fullsize</em>. Be sure to try this page in RTL mode and it should look the same as LTR.</p>
                <p><img class="size-full wp-image-906 aligncenter" title="Image Alignment 580x300" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-580x300.jpg" alt="Image Alignment 580x300" width="580" height="300" /></p>
                <p>The image above happens to be <em><strong>centered</strong></em>.</p>
                <p><img class="size-full wp-image-904 alignleft" title="Image Alignment 150x150" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-150x150.jpg" alt="Image Alignment 150x150" width="150" height="150" /> The rest of this paragraph is filler for the sake of seeing the text wrap around the 150x150 image, which is <em><strong>left aligned</strong></em>.</p>
                <p>As you can see the should be some space above, below, and to the right of the image. The text should not be creeping on the image. Creeping is just not right. Images need breathing room too. Let them speak like you words. Let them do their jobs without any hassle from the text. In about one more sentence here, we'll see that the text moves from the right of the image down below the image in seamless transition. Again, letting the do it's thang. Mission accomplished!</p>
                <p>And now for a <em><strong>massively large image</strong></em>. It also has <em><strong>no alignment</strong></em>.</p>
                <p><img class="alignnone  wp-image-907" title="Image Alignment 1200x400" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-1200x4002.jpg" alt="Image Alignment 1200x400" width="1200" height="400" /></p>
                <p>The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.</p>
                <p><img class="aligncenter  wp-image-907" title="Image Alignment 1200x400" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-1200x4002.jpg" alt="Image Alignment 1200x400" width="1200" height="400" /></p>
                <p>And we try the large image again, with the center alignment since that sometimes is a problem. The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.</p>
                <p><img class="size-full wp-image-905 alignright" title="Image Alignment 300x200" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-300x200.jpg" alt="Image Alignment 300x200" width="300" height="200" /></p>
                <p>And now we're going to shift things to the <em><strong>right align</strong></em>. Again, there should be plenty of room above, below, and to the left of the image. Just look at him there... Hey guy! Way to rock that right side. I don't care what the left aligned image says, you look great. Don't let anyone else tell you differently.</p>
                <p>In just a bit here, you should see the text start to wrap below the right aligned image and settle in nicely. There should still be plenty of room and everything should be sitting pretty. Yeah... Just like that. It never felt so good to be right.</p>
                <p>And just when you thought we were done, we're going to do them all over again with captions!</p>
                [caption id="attachment_906" align="aligncenter" width="580"]<img class="size-full wp-image-906  " title="Image Alignment 580x300" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-580x300.jpg" alt="Image Alignment 580x300" width="580" height="300" /> Look at 580x300 getting some <a title="Image Settings" href="https://en.support.wordpress.com/images/image-settings/">caption</a> love.[/caption]
                <p>The image above happens to be <em><strong>centered</strong></em>. The caption also has a link in it, just to see if it does anything funky.</p>
                [caption id="attachment_904" align="alignleft" width="150"]<img class="size-full wp-image-904  " title="Image Alignment 150x150" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-150x150.jpg" alt="Image Alignment 150x150" width="150" height="150" /> Bigger caption than the image usually is.[/caption]
                <p>The rest of this paragraph is filler for the sake of seeing the text wrap around the 150x150 image, which is <em><strong>left aligned</strong></em>.</p>
                <p>As you can see the should be some space above, below, and to the right of the image. The text should not be creeping on the image. Creeping is just not right. Images need breathing room too. Let them speak like you words. Let them do their jobs without any hassle from the text. In about one more sentence here, we'll see that the text moves from the right of the image down below the image in seamless transition. Again, letting the do it's thang. Mission accomplished!</p>
                <p>And now for a <em><strong>massively large image</strong></em>. It also has <em><strong>no alignment</strong></em>.</p>
                [caption id="attachment_907" align="alignnone" width="1200"]<img class=" wp-image-907" title="Image Alignment 1200x400" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-1200x4002.jpg" alt="Image Alignment 1200x400" width="1200" height="400" /> Comment for massive image for your eyeballs.[/caption]
                <p>The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.</p>
                [caption id="attachment_907" align="aligncenter" width="1200"]<img class=" wp-image-907" title="Image Alignment 1200x400" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-1200x4002.jpg" alt="Image Alignment 1200x400" width="1200" height="400" /> This massive image is centered.[/caption]
                <p>And again with the big image centered. The image above, though 1200px wide, should not overflow the content area. It should remain contained with no visible disruption to the flow of content.</p>
                [caption id="attachment_905" align="alignright" width="300"]<img class="size-full wp-image-905 " title="Image Alignment 300x200" src="https://wpthemetestdata.files.wordpress.com/2013/03/image-alignment-300x200.jpg" alt="Image Alignment 300x200" width="300" height="200" /> Feels good to be right all the time.[/caption]
                <p>And now we're going to shift things to the <em><strong>right align</strong></em>. Again, there should be plenty of room above, below, and to the left of the image. Just look at him there... Hey guy! Way to rock that right side. I don't care what the left aligned image says, you look great. Don't let anyone else tell you differently.</p>
                <p>In just a bit here, you should see the text start to wrap below the right aligned image and settle in nicely. There should still be plenty of room and everything should be sitting pretty. Yeah... Just like that. It never felt so good to be right.</p>
                <p>And that's a wrap, yo! You survived the tumultuous waters of alignment. Image alignment achievement unlocked! One last thing: The last item in this post's content is a thumbnail floated right. Make sure any elements after the content are clearing properly.</p>
                <p><img class="alignright size-thumbnail wp-image-827" title="Camera" src="https://wpthemetestdata.files.wordpress.com/2010/08/manhattansummer.jpg?w=150" alt="" width="160" /></p>

            </div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="embedded__audio">
            <header>
                <h2>Audio</h2>
            </header>
            <div><audio controls="">audio</audio></div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="embedded__video">
            <header>
                <h2>Video</h2>
            </header>
            <div><video controls="">video</video></div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="embedded__canvas">
            <header>
                <h2>Canvas</h2>
            </header>
            <div><canvas>canvas</canvas></div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="embedded__meter">
            <header>
                <h2>Meter</h2>
            </header>
            <div><meter value="2" min="0" max="10">2 out of 10</meter></div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="embedded__progress">
            <header>
                <h2>Progress</h2>
            </header>
            <div><progress>progress</progress></div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="embedded__svg">
            <header>
                <h2>Inline SVG</h2>
            </header>
            <div><svg width="100px" height="100px">
                    <circle cx="100" cy="100" r="100" fill="#1fa3ec"></circle>
                </svg></div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
        <article id="embedded__iframe">
            <header>
                <h2>IFrame</h2>
            </header>
            <div><iframe src="index.html" height="300"></iframe></div>
            <footer>
                <p><a href="#top">[Top]</a></p>
            </footer>
        </article>
    </section>
    <section id="forms">
        <header>
            <h1>Form elements</h1>
        </header>
        <form>
            <fieldset id="forms__input">
                <legend>Input fields</legend>
                <p>
                    <label for="input__text">Text Input</label>
                    <input id="input__text" type="text" placeholder="Text Input">
                </p>
                <p>
                    <label for="input__password">Password</label>
                    <input id="input__password" type="password" placeholder="Type your Password">
                </p>
                <p>
                    <label for="input__webaddress">Web Address</label>
                    <input id="input__webaddress" type="url" placeholder="http://yoursite.com">
                </p>
                <p>
                    <label for="input__emailaddress">Email Address</label>
                    <input id="input__emailaddress" type="email" placeholder="name@email.com">
                </p>
                <p>
                    <label for="input__phone">Phone Number</label>
                    <input id="input__phone" type="tel" placeholder="(999) 999-9999">
                </p>
                <p>
                    <label for="input__search">Search</label>
                    <input id="input__search" type="search" placeholder="Enter Search Term">
                </p>
                <p>
                    <label for="input__text2">Number Input</label>
                    <input id="input__text2" type="number" placeholder="Enter a Number">
                </p>
                <p>
                    <label for="input__text3" class="error">Error</label>
                    <input id="input__text3" class="is-error" type="text" placeholder="Text Input">
                </p>
                <p>
                    <label for="input__text4" class="valid">Valid</label>
                    <input id="input__text4" class="is-valid" type="text" placeholder="Text Input">
                </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__select">
                <legend>Select menus</legend>
                <p>
                    <label for="select">Select</label>
                    <select id="select">
                        <optgroup label="Option Group">
                            <option>Option One</option>
                            <option>Option Two</option>
                            <option>Option Three</option>
                        </optgroup>
                    </select>
                </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__checkbox">
                <legend>Checkboxes</legend>
                <ul class="list list--bare">
                    <li><label for="checkbox1"><input id="checkbox1" name="checkbox" type="checkbox" checked="checked"> Choice A</label></li>
                    <li><label for="checkbox2"><input id="checkbox2" name="checkbox" type="checkbox"> Choice B</label></li>
                    <li><label for="checkbox3"><input id="checkbox3" name="checkbox" type="checkbox"> Choice C</label></li>
                </ul>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__radio">
                <legend>Radio buttons</legend>
                <ul class="list list--bare">
                    <li><label for="radio1"><input id="radio1" name="radio" type="radio" class="radio" checked="checked"> Option 1</label></li>
                    <li><label for="radio2"><input id="radio2" name="radio" type="radio" class="radio"> Option 2</label></li>
                    <li><label for="radio3"><input id="radio3" name="radio" type="radio" class="radio"> Option 3</label></li>
                </ul>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__textareas">
                <legend>Textareas</legend>
                <p>
                    <label for="textarea">Textarea</label>
                    <textarea id="textarea" rows="8" cols="48" placeholder="Enter your message here"></textarea>
                </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__html5">
                <legend>HTML5 inputs</legend>
                <p>
                    <label for="ic">Color input</label>
                    <input type="color" id="ic" value="#000000">
                </p>
                <p>
                    <label for="in">Number input</label>
                    <input type="number" id="in" min="0" max="10" value="5">
                </p>
                <p>
                    <label for="ir">Range input</label>
                    <input type="range" id="ir" value="10">
                </p>
                <p>
                    <label for="idd">Date input</label>
                    <input type="date" id="idd" value="1970-01-01">
                </p>
                <p>
                    <label for="idm">Month input</label>
                    <input type="month" id="idm" value="1970-01">
                </p>
                <p>
                    <label for="idw">Week input</label>
                    <input type="week" id="idw" value="1970-W01">
                </p>
                <p>
                    <label for="idt">Datetime input</label>
                    <input type="datetime" id="idt" value="1970-01-01T00:00:00Z">
                </p>
                <p>
                    <label for="idtl">Datetime-local input</label>
                    <input type="datetime-local" id="idtl" value="1970-01-01T00:00">
                </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
            <fieldset id="forms__action">
                <legend>Action buttons</legend>
                <p>
                    <input type="submit" value="<input type=submit>">
                    <input type="button" value="<input type=button>">
                    <input type="reset" value="<input type=reset>">
                    <input type="submit" value="<input disabled>" disabled>
                </p>
                <p>
                    <button type="submit">&lt;button type=submit&gt;</button>
                    <button type="button">&lt;button type=button&gt;</button>
                    <button type="reset">&lt;button type=reset&gt;</button>
                    <button type="button" disabled>&lt;button disabled&gt;</button>
                </p>
            </fieldset>
            <p><a href="#top">[Top]</a></p>
        </form>
    </section>
</main>
<footer role="contentinfo">
    <p>Made by <a href="http://twitter.com/cbracco">@cbracco</a>. Code on <a href="http://github.com/cbracco/html5-test-page">GitHub</a>.</p>
</footer>
</div>