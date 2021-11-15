<xsl:transform version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/catalog">
        <html>
            <head>
                <title>CD Catalog</title>
            </head>
            <body>
                <h1>The CD's</h1>
                <table border="1px">
                    <tr>
                        <th style="width:10em;">Title</th>
                        <th style="width:10em;">Artist</th>
                        <th style="width:10em;">Country</th>
                        <th style="width:10em;">Company</th>
                        <th style="width:10em;">Price</th>
                        <th style="width:10em;">Year</th>
                    </tr>
                    <xsl:for-each select="cd">
                        <xsl:sort select="title" />
                        <tr style="text-align:center; height: 3em">
                            <td style="width:10em;">
                                <xsl:value-of select="title" />
                            </td>
                            <td style="width:10em;">
                                <xsl:value-of select="artist" />
                            </td>
                            <td style="width:10em;">
                                <xsl:value-of select="country" />
                            </td>
                            <td style="width:10em;">
                                <xsl:value-of select="company" />
                            </td>
                            <xsl:choose>
                                <xsl:when test="price &lt; 10">
                                    <td style="width:10em; color:#17B0A4;">
                                        <xsl:value-of select="price" />
                                    </td>
                                </xsl:when>
                                <xsl:otherwise>
                                    <td style="width:10em; color:#FF5E2A;">
                                        <xsl:value-of select="price"/>
                                    </td>
                                </xsl:otherwise>
                            </xsl:choose>
                            <td style="width:10em;">
                                <xsl:value-of select="year" />
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
                <br />
                <br />
            </body>
        </html>
    </xsl:template>
</xsl:transform>