import * as React from 'react'
import { observer } from 'mobx-react'
import TextField from 'material-ui/TextField'
import {
  Card,
  CardHeader,
  CardText
} from 'material-ui/Card'
import {
  List,
  ListItem
} from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import Snackbar from 'material-ui/Snackbar'
import { Page } from 'components/Page'
import { Clip } from 'components/Clip'
import { Divider } from 'components/Divider'
import { Loading } from 'components/Loading'
import {
  headerStyle,
  titleStyle
} from 'styles/react/card/header'
import { textFieldStyle } from 'styles/react/textfield'
import i18nStore from 'stores/i18n'
import form from './form'
import store from './store'

import * as style from './style.scss'

@i18nStore.namespace(['self'])
@observer
export class ViewSelf extends React.Component<void, void> {
  render() {
    const { output, output15, resetGenPassword, copy, copyOpenState, autoCloseCopyState, links, loadings } = store
    const { t } = i18nStore
    const listItem = links.map((link, index) =>
      (
        <div key={link.url}>
          {index > 0 && <Divider />}
          <a href={link.url} target="_blank">
            <ListItem>
              <div>
                {index + 1}. <span className="badge">{t('self:type.' + link.type)}</span>{link.title}
              </div>
            </ListItem>
          </a>
        </div>
      )
    )

    return (
      <Page title={t('common:self')}>
        <Card className="each-block">
          <CardHeader
            title={t('self:genPassword')}
            style={headerStyle}
            titleStyle={titleStyle}
          />
          <CardText>
            <form onSubmit={form['onSubmit']} onChange={resetGenPassword}>
              <TextField
                {...form['$']('password').bind() }
                style={textFieldStyle}
                errorText={form['$']('password').error}
                floatingLabelText={t('self:initPassword')}
                type="password"
              />
              <TextField
                {...form['$']('key').bind() }
                style={textFieldStyle}
                errorText={form['$']('key').error}
                floatingLabelText={t('self:key')}
              />

              <RaisedButton type="submit" primary={true} label={t('self:gen')} />
            </form>

            <div className={style.gencontainer}>
              <p className={style.p}>
                {t('self:outputDesc')}: {output}
              </p>
              {output && <Clip value={output} onClip={copy}><RaisedButton label={t('self:copy')} /></Clip>}
            </div>
            <div className={style.gencontainer}>
              <p className={style.p}>
                {t('self:outputDesc15')}: {output15}
              </p>
              {output15 && <Clip value={output15} onClip={copy}><RaisedButton label={t('self:copy')} /></Clip>}
            </div>
          </CardText>
        </Card>
        <Card className="each-block">
          <CardHeader
            title={t('self:genPassword')}
            style={headerStyle}
            titleStyle={titleStyle}
          />
          <List style={{ paddingTop: 0 }}>
            {listItem}

            {loadings.links && <Loading />}
          </List>
        </Card>
        <Snackbar
          open={copyOpenState}
          message={t('self:copySuccess')}
          autoHideDuration={1500}
          onRequestClose={autoCloseCopyState}
          style={{ textAlign: 'center' }}
        />
      </Page>
    )
  }
}
